const nonAlphaNumericChars =
  'àáäâãåèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;';

const alphNumericChars =
  'aaaaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------';

const nonAlphaNumericCharsRegExp = new RegExp(
  [...nonAlphaNumericChars].join('|'),
  'g',
);

export default function slugify(source: string): string {
  return source
    .toString()
    .toLowerCase()
    .replaceAll(/\s+/g, '-') // Replace spaces with -
    .replaceAll(nonAlphaNumericCharsRegExp, c =>
      alphNumericChars.charAt(nonAlphaNumericChars.indexOf(c)),
    ) // Replace special characters in a with b
    .replaceAll('&', '-and-') // Replace & with 'and'
    .replaceAll(/[^\w-]+/g, '') // Remove all non-word characters such as spaces or tabs
    .replaceAll(/--+/g, '-') // Replace multiple — with single -
    .replace(/^-+/, '') // Trim — from start of text
    .replace(/-+$/, ''); // Trim — from end of text
}
