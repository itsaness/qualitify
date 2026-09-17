import crypto from "crypto";
export  function hashPhone(data){
    if(!data){
        return undefined;
    }
    const cleanStr = data.replace(/[^0-9]/g,'');
    return crypto.createHash('sha256').update(cleanStr).digest('hex');

}