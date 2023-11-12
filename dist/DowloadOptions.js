var DownloadOptions;
(function (DownloadOptions) {
    DownloadOptions.Default = {
        validate: true
    };
    function withDefaults(options) {
        return Object.assign(DownloadOptions.Default, options);
    }
    DownloadOptions.withDefaults = withDefaults;
})(DownloadOptions || (DownloadOptions = {}));
export default DownloadOptions;
