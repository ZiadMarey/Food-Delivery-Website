import './info-container.css';
import { Link } from 'react-router-dom';
import { useState } from 'preact/hooks';


function RestaurantInfoComponent(){
    
    const [inputList, setInputList] = useState([]);    

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
    };



    return(
        <div className='info-container' >
            <div className='title-text'>Restaurant Information</div>
            <form action="#">
            
                {/* <div className="description input" placeholder='Description'>
                    <select>
                        <option value="Asian">Asian</option>
                    </select>
                </div> */}
                <div class="sel sel--black-panther">
                    <label for="description-select" className='descrition-label'>Description</label>
                    <select id="description-select" required >
                        <option selected value="0" disabled hidden>Description</option>
                        <option value="1">Arabic</option>
                        <option value="2">Asian</option>
                        <option value="3">Breakfast</option>
                        <option value="4">Chinese</option>
                        <option value="5">Indian</option>
                        <option value="6">Jamaican</option>
                        <option value="7">Japanese</option>
                        <option value="5">Mexican</option>
                        <option value="5">Vegan</option>
                    </select>   
                </div>

                 
                

                <div className='opening-hours-div' >
                    <label for='opening-input' className='opening-label'>Opening Hour</label>
                    <input type="number" required min={0} max={24} id="opening-input" className='opening-input' />
                </div>

                <div className='closing-hours-div'>
                    <label for='closing-input' className='closing-label'>Closing Hour</label>
                    <input type="number" required min={0} max={24} id="closing-input" className='closing-input' />
                </div>

                <div className='zip-codes-div'>
                    <label for="zip-codes" className='zip-codes-label'>Zip Codes Available For Delivery</label>
                    <input type="textarea" required className='zip-codes-input' />
                </div>
                
            </form>
                
            <button className='finish-button' >
                Submit
            </button>
            

        </div>
    )

}

export default RestaurantInfoComponent;