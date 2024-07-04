const parseBoolean = (str) => {
    if (typeof str === 'string') {
        const lowerStr = str.trim().toLowerCase();
        if (lowerStr === 'true' || lowerStr === '1') {
            return true;
        } else if (lowerStr === 'false' || lowerStr === '0') {
            return false;
        }
    }
    return Boolean(str);
};

module.exports = parseBoolean;