import * as config from '@commitlint/config-conventional';
import * as commitlint from '@commitlint/core';
import SemanticReleaseError from '@semantic-release/error';

import interopRequireDefault from '@babel/runtime/helpers/interopRequireDefault';
const format = interopRequireDefault(commitlint.format).default,
  lint = interopRequireDefault(commitlint.lint).default,
  load = interopRequireDefault(commitlint.load).default;

export async function verifyRelease(repoData, options) {
  return validateCommits(options);
}

export async function validateCommits({ commits, logger }) {
  const opts = await load(config);
  const skipCommits = (process.env.SEMANTIC_COMMITLINT_SKIP || '').split(',').filter((sha) => sha);
  await Promise.all(
    commits.map((commit) => {
      const skipCommit = skipCommits.some((commitPrefix) =>
        commit.commit.long.startsWith(commitPrefix)
      );
      return skipCommit ? null : validateCommit(commit, opts, logger);
    })
  );
  logger.log('All commits validated with commitlint');
}

async function validateCommit(commitMeta, opts, logger) {
  const report = await lint(
    `${commitMeta.message}`,
    opts.rules,
    opts.parserPreset ? { parserOpts: opts.parserPreset.parserOpts } : {}
  );
  if (!report.valid) {
    const detail = commitMeta.commit.short ? ` ${commitMeta.commit.short}` : '';
    logger.error(`😞   Errors found with commit${detail}`);
    logger.error(`💬   ${commitMeta.message}`);
    const formatted = format({ errors: report.errors });
    formatted.forEach((item) => logger.log(item));
    throw new SemanticReleaseError(
      `The commit message is not formatted correctly`,
      'EINVALIDCOMMIT'
    );
  }
}
