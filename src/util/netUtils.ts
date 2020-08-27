export function sendGetRequest(url: string, data: object) {
    return new Promise((resolve, reject) => {
        let newUrl = appendParams(url, data)

        const token = window.localStorage.getItem("token");
        let headers = {};
        fetch(newUrl, {
            method: 'GET',
            mode: 'cors',
            headers,
        }).then(response => {
            if (response.status >= 400) {
                errorHandle(response.body, reject)
            } else {
                successHandle(response.json(), resolve)
            }
        })
    })
}

function successHandle(res: any, resolve: any) {
    resolve(res)
}

function errorHandle(res: any, reject: any) {
    reject(res)
}

function appendParams(url: string, params: object) {
    if (params) {
        let baseWithSearch = url.split('#')[0]
        let hash = url.split('#')[1]
        for (let key in params) {
            if (!params.hasOwnProperty(key)) {
                continue
            }
            // @ts-ignore
            let attrValue = params[key]
            if (attrValue !== undefined) {
                let newParam = key + '=' + attrValue
                if (baseWithSearch.indexOf('?') > 0) {
                    let oldParamReg = new RegExp('^' + key + '=[-%.!~*\'\(\)\\w]*', 'g')
                    if (oldParamReg.test(baseWithSearch)) {
                        baseWithSearch = baseWithSearch.replace(oldParamReg, newParam)
                    } else {
                        baseWithSearch += '&' + newParam
                    }
                } else {
                    baseWithSearch += '?' + newParam
                }
            }
        }
        if (hash) {
            url = baseWithSearch + '#' + hash
        } else {
            url = baseWithSearch
        }
    }
    return url
}