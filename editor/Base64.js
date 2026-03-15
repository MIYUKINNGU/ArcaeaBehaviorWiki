// From https://developer.mozilla.org/en-US/docs/Glossary/Base64#the_unicode_problem.
function base64ToText(base64) {
  return decodeURIComponent(atob(base64))
}

// From https://developer.mozilla.org/en-US/docs/Glossary/Base64#the_unicode_problem.
function textToBase64(text) {
  return btoa(encodeURIComponent(text));
}