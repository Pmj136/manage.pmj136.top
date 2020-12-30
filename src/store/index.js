Vue.use(Vuex);

const moduleFiles = require.context("./modules", false, /\.js/);

const modules = moduleFiles.keys().reduce((obj, modulePath) => {
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
    obj[moduleName] = moduleFiles(modulePath)["default"];
    return obj;
}, {});
export default new Vuex.Store({
    modules
});
