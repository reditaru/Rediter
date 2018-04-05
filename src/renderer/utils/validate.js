
const ruleFunction = {
    required: (flag) => (value) => (!flag || (flag && value !== "")),
    min: (len) => (value) => typeof value === 'string' && value.length >= len,
    max: (len) => (value) => typeof value === 'string' && value.length <= len
}

export function validate(rules, elems) {
    let result = {};
    let f1 = true, f2 = true;
    let msg = '';
    Object.keys(rules).every((field) => {
        if(!elems[field]){
            f1 = false;
            msg = `Cannot find ${field} field!`;
            return false;
        }
        let value = elems[field].value;
        Object.keys(rules[field]).every((cond) => {
            if (ruleFunction[cond](rules[field][cond].value)(value)){
                result[field] = value;
                return true;
            }
            else {
                f2 = false;
                msg = rules[field][cond].msg;
                return false;
            }
        });
        if (!f2) {
            return false;
        }
        return true;
    });
    if (f1 && f2) 
        return { result, success: true };
    return { success: false, msg: msg };
}