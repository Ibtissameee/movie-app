import './comingsooncard.css';
export default function ComingSoonCard({movie}){

    return(
        <div className='coming-soon-card'>
          <img src={movie.previewImg}/>
          <div className='content'>
            <h4>{movie.title}</h4>                                    
          </div>
        </div>
  
    );
}