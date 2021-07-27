export const url="http://maktab2.herokuapp.com"

export const httpRequest=(config)=>{
    return(axios({
        ...config
    }))
}