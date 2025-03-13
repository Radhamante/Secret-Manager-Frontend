module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine", "@angular-devkit/build-angular"],
    plugins: [
      require("karma-jasmine"),
      require("karma-chrome-launcher"),
      require("karma-coverage"),
      require("karma-jasmine-html-reporter"),
      require("@angular-devkit/build-angular/plugins/karma"),
    ],
    files: [
      { pattern: "src/**/*.spec.ts", included: true }, // Vérifie cette ligne !
    ],
    reporters: ["progress", "kjhtml"],
    browsers: ["Brave"],
    customLaunchers: {
      Brave: {
        base: "Chrome",
        flags: ["--no-sandbox", "--disable-gpu"],
        binary:
          "C:/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe", // Modifiez selon votre chemin
      },
    },
    singleRun: false,
  });
};
