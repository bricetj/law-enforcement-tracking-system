/**
 * Creates an Popup Window (must be styled by CSS). 
 * @param {string} text The text to be displayed in the popup.
 * @param {boolean} isVisible A boolean indicating if the popup is
 * visible.
 * @param {function} onNo Function that runs when no is selected.
 * @param {function} onYes Function that runs when yes is selected.
 * @returns An HTML div element with a message and two buttons.
 */
function PopupWindow ({text, isVisible, onNo, onYes}){
    if (!isVisible) {
        return null;
    }

    return (
            <div className='popup-outer-div'>
                <div className='popup-inner-div'>
                    <p className='popup-text'>{text}</p>
                    <button className='popup-button' onClick={onNo}>No</button>
                    <button className='popup-button' onClick={onYes}>Yes</button>
                </div>
            </div>
    );
}

export default PopupWindow;
