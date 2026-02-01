function readPackage(pkg) {
  // Disable build scripts for these packages
  if (pkg.name === 'sharp' || pkg.name === 'unrs-resolver') {
    pkg.scripts = pkg.scripts || {};
    delete pkg.scripts.install;
    delete pkg.scripts.postinstall;
    delete pkg.scripts.build;
  }
  return pkg;
}

module.exports = {
  hooks: {
    readPackage,
  },
};
