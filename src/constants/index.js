let BASE_URL ='/'

if(process.env.NODE_ENV === 'production'){
    BASE_URL = '/admin-portal/build/'
}

export { BASE_URL }
