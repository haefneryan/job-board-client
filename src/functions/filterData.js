
export const filterData = (state) => {
    let data = state.data
    if (data !== null) {
        let result = data;
        if (state.filters.jobTitle.length > 0) {
        result = result.filter((x) => {
            let title = x.jobTitle.toLowerCase()
            if (title.includes(`${state.filters.jobTitle}`)) {
            return x;
            } else { return null }
        })
        }
        if (state.filters.companyName.length > 0) {
        result = result.filter((x) => {
            let company = x.companyName.toLowerCase();
            if (company.includes(`${state.filters.companyName}`)) {
            return x;
            } else { return null }
        })
        }
        if (state.filters.senorityLevel.length > 0) {
        result = result.filter((x) => {
            let senority_Level = x.senorityLevel.toLowerCase();
            if (senority_Level === state.filters.senorityLevel) {
            return x;
            } else { return null }
        })
        }
        if (state.filters.location.length > 0) {
        result = result.filter((x) => {
            let location = x.location.toLowerCase();
            if (location === state.filters.location) {
            return x;
            } else { return null }
        })
        }
        if (state.filters.remote === true) {
        result = result.filter((x) => {
            if (x.remote === state.filters.remote) {
            return x;
            } else { return null }
        })
        }
        if (state.filters.onsite === true) {
        result = result.filter((x) => {
            if (!x.location.includes('Remote')) {
            return x;
            } else { return null }
        })
        }
        if (state.filters.jobTitle.length === 0 && state.filters.companyName.length === 0 && state.filters.senorityLevel.length === 0 && state.filters.location.length === 0 && state.filters.remote === false && state.filters.onsite === false) {
            return data
        } else {
            return result
        }
    }
}