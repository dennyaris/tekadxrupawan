(function() {
  const targetDomain = "https://rupawan.kasihsolusi.com";

  const repoPrefix = "/tekadxrupawan";
  const currentPath = window.location.pathname.replace(repoPrefix, "");

  window.location.replace(targetDomain + currentPath);
})();