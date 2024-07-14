export default class apiFeature {
    constructor(mongooseQuery, queryString) {
        this.mongooseQuery = mongooseQuery
        this.queryString = queryString

    }
    pagination() {
        let page = (this.queryString.page * 1) || 1
        if (this.queryString.page <= 0) page = 1
        let skip = (page - 1) * 3
        this.page = page

        this.mongooseQuery.skip(skip).limit(3)
        return this;
    }

    filter() {
        let filterObj = { ...this.queryString }
        delete filterObj.page
        filterObj = JSON.stringify(filterObj)
        filterObj = JSON.parse(filterObj)
        this.mongooseQuery.find(filterObj)
        return this
    }
}