const Homepage = ()=>{
    const imgpath = 'https://uploads-ssl.webflow.com/5e3ce2ec7f6e53c045fe7cfa/603dd39e1da857523f684124_Frame-21.png'
    return (
        <div class='row animate__animated animate__slideInRight'>
            <div class='col'>
            <img src={imgpath} style={{height:'90vh'}} alt='image not found' />
            </div>
            {/* <div class='col text-center'>
                <h1 style={{fontSize: '6rem',
                    wordBreak: 'break-all',
                    paddingTop: '140px',
                    color:'#ff7600e8',
                    fontFamily: 'fantasy'}}
                    
                >ProcessPro</h1>
            </div>
             */}
        </div>
    )
}

export default Homepage