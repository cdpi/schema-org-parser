function statistics(values) {
    let statistics = {};
    statistics.count = 0;
    statistics.blank = 0;
    statistics.comma = false;
    let set = new Set();
    values.forEach(value => {
        statistics.count++;
        if (value.trim().length === 0) {
            statistics.blank++;
        }
        else {
            if (!statistics.comma) {
                statistics.comma = value.indexOf(",") >= 0;
            }
        }
        set.add(value);
    });
    statistics.unique = (values.length === set.size);
    return statistics;
}
export { statistics };
