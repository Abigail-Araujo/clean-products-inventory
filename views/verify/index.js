const textInfo = document.getElementById('textInfo');


(async () =>{
    try {
        const token = window.location.pathname.split('/')[3];
        const id = window.location.pathname.split('/')[2];
        const {data} = await axios.patch(`/api/users/${id}/${token}`);
        
        textInfo.innerHTML = data.message;

        setTimeout(() => {
            window.location.pathname = '/login/';
        }
        , 3000);

    } catch (error) {
        textInfo.innerHTML = error.response.data.error;
    }
})();