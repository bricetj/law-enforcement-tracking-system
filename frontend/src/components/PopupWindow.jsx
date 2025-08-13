/*
 * Brice Jenkins and Andrew Heilesen
 * Copyright: 2025
 * 
 * 
 * Citation for use of AI Tools:
 * Date: 8/6/2025
 * Adapted From: Google AI overview.
 * Prompt used: "how to create a popup in react"
 * Source URL: https://www.google.com/
 */

/**
 * Creates an Popup Window (must be styled by CSS). 
 * @param {string} text The text to be displayed in the popup.
 * @param {element} childElement A React component or other html component
 * to be featured in the popup.
 * @param {boolean} isVisible A boolean indicating if the popup is visible.
 * @param {string} noButtonText Text to be displayed in the negation button.
 * @param {string} yesButtonText Text to be displayed in the confirmation button.
 * @param {function} onNo Function that runs when no is selected.
 * @param {function} onYes Function that runs when yes is selected.
 * @returns An HTML div element with a message, additional elements (if applicable),
 * and two buttons.
 */
function PopupWindow ({text, childElement, isVisible, noButtonText, yesButtonText, onNo, onYes, itemToSubmit}){
    // Hides the popup when not activated.
    if (!isVisible) {
        return null;
    }

    return (
            <div className='popup-outer-div'>
                <div className='popup-inner-div'>
                    <p className='popup-text'>{text}</p>
                    <div>{childElement}</div>
                    <button className='popup-button' onClick={onNo}>{noButtonText}</button>
                    <button className='popup-button' onClick={e => {
                                                            e.preventDefault();
                                                            onYes(itemToSubmit)}}
                    >{yesButtonText}</button>
                </div>
            </div>
    );
}

export default PopupWindow;
