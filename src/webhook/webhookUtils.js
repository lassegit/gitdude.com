import fetch from 'isomorphic-fetch';
import getRuleURI from 'eslint-rule-documentation';
import { Commit } from '../data/models';

// Remove unallowed file extentions
const allowedFiles = (commit) => {
  const allowedExtensions = ['.js', '.jsx', '.es6', '.es5'].join(' ');
  const commitFiles = [...commit.added, ...commit.modified];
  let allowedFiles = [];

  for (var i = 0; i < commitFiles.length; i++) {
    const file = commitFiles[i];
    const fileExtension = file.substr(file.lastIndexOf('.') + 1);

    if (allowedExtensions.indexOf(fileExtension) !== -1) {
      allowedFiles.push(file);
    }
  }

  return allowedFiles;
};

// Generate markdown
// Emoji: https://www.webpagefx.com/tools/emoji-cheat-sheet/
const commentMarkdown = (lintedFiles, user, repo, commitId) => {
  const repoUrl = `https://github.com/${user.userName}/${repo.name}`;
  let markdown = '';

  for (var i = 0; i < lintedFiles.length; i++) {
    const file = lintedFiles[i];
    const fileName = file.name;

    // Too big
    if (file.snippetLength > 15000) {
      markdown += `\n **${fileName}:** File too big (${file.snippetLength} characters, max. 15K) \n`;
    }
    // No errors
    else if (file.lint.length === 0) {
      markdown += `\n **${fileName}: :heavy_check_mark:** \n`;
    }
    // Errors
    else {
      markdown += `\n **${fileName}** (${file.lint.length}) \n`;

      for (var x = 0; x < file.lint.length; x++) {
        const item = file.lint[x];
        const message = item.message.replace(/\n|\r/g, ''); // Some strings contain line breaks

        markdown += `<code>${message}</code>`;

        markdown += `<code>[L${item.line}:${item.column}](${repoUrl}/blob/${commitId}/${fileName}#L${item.line})</code>`;

        if (item.ruleId) {
          const ruleUrl = getRuleURI(item.ruleId);

          if (ruleUrl.found) {
            markdown += `[…](${ruleUrl.url} "${item.ruleId}")`;
          }
        }

        if (item.fatal) {
          markdown += ` :heavy_multiplication_x:`;
        }

        markdown += `\n`;
      }
    }
  }

  // markdown += `![alt text](https://raw.githubusercontent.com/adam-p/markdown-here/master/src/common/images/icon24.png "Logo Title Text 1")`;
  markdown += `\n Made by [Gitdude.com](https://gitdude.com "Helpful comments")`;

  return markdown;
};

// Post comment to commit
const postComment = async (user, repo, commitId, comment) => {

  if (comment.length > 65536) {
    comment = '**The comment is being cut because it surpasses Github\'s maximum comment length of 65,536 characters.** \n' + comment;
    comment = comment.substring(0, 65150);
  }

  // https://developer.github.com/v3/repos/comments/#create-a-commit-comment
  const resp = await fetch(`https://api.github.com/repos/${user.userName}/${repo.name}/commits/${commitId}/comments`, {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'User-Agent': 'GitDude',
      'Authorization': (user && user.accessToken) ? `Bearer ${user.accessToken}` : 'No accessToken',
    },
    body: JSON.stringify({
      'body': comment,
    })
  });
  const { id, errors } = await resp.json();

  if (errors) {
    return { error: true, message: errors[0].message, commit_id: commitId, id: null };
  }

  return { commentId: id };
};

// Save the commit in database
// TODO: count errors and files for statistics
const saveCommit = async (commitData, user, repo, commentData, reqBody, lintedFiles) => {
  const branch = reqBody.ref.split('/')[2] || null;
  const commentId = commentData.commentId || null;

  let commit = await Commit.create({
    name: commitData.message,
    linted: lintedFiles,
    branch: branch,
    commitId: commitData.id,
    treeId: commitData.tree_id,
    commentId: commentId,
    repositoryId: repo.id,
    userId: user.id,
  });

  return commit;
};

export { allowedFiles, postComment, commentMarkdown, saveCommit };


