module.exports = function (api) {
    api.cache(true);
    return {
        presets: ["babel-preset-expo"], // Use the Expo Babel preset
        plugins: [],
    };
};
