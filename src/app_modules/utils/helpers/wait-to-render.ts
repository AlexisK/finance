export const waitToRender = function() {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, 1);
    });
};
