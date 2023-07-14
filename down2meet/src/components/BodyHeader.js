export default function BodyHeader() {

    const toggleMobileMenu = () => {
        const menunav = document.querySelector(".Body-Left");
        menunav.classList.toggle("active");
    }

    
    return (
        <div className="Body-Header">
            <div className="Body-Header-Container">
                <button className='Menu-Popup' onClick={toggleMobileMenu}><i class="fa-solid fa-bars"></i></button>
                <h1 className='middle-text'>My Feed</h1>
            </div>
            <div className='middle-line'></div>
        </div>
    )
}