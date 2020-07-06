import React, {Component} from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './Navbar.css';
import {Select, IconButton, Snackbar, MenuItem} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import {Link} from 'react-router-dom';

class Navbar extends Component{
    constructor(props){
        super(props);
        this.state={format: "hex", open: false};
        this.handleFormatChange=this.handleFormatChange.bind(this);
        this.closeSnackbar=this.closeSnackbar.bind(this);
    }

    handleFormatChange(e){
        this.setState({format: e.target.value, open: true});
        this.props.handleChange(e.target.value);
    }

    closeSnackbar(){
        this.setState({open: false})
    }

    render(){
        const {level, changeLevel}=this.props;
        const {format}=this.state;
        return(
            <header className='Navbar'>
                <div className='logo'>
                    <Link to='/'>Color Picker</Link>
                </div>
                <div className='slider-container'>
                    <span>Level: {level}</span>
                </div>
                <div className='slider'>
					<Slider 
						defaultValue={level} 
						min={100} 
						max={900}
						step={100}
						onAfterChange={changeLevel}
					/>
				</div>
                <div className='select-container'> 
                    <Select value={this.state.format} onChange={this.handleFormatChange}>
                        <MenuItem value="hex">HEX - #ffffff</MenuItem>
                        <MenuItem value="rgb">RGB - rgb(10)</MenuItem>
                        <MenuItem value="rgba">RGBA - rgba</MenuItem>
                    </Select>
                    <Snackbar 
                        anchorOrigin={{vertical: "bottom", horizontal: "left"}}
                        open={this.state.open}
                        autoHideDuration={2000}
                        message={<span id="message-id">Format Changed To: {format.toUpperCase()}</span>}
                        ContentProps={{
                            "aria-describedby": "message-id"
                        }}
                        onClose={this.closeSnackbar}
                        action={[
                            <IconButton 
                                onClick={this.closeSnackbar}
                                color='inherit'
                                key='close'
                                aria-label='close'
                            >
                                <CloseIcon/>
                            </IconButton>
                        ]}
                    />
                </div>
            </header>
        )
    }
}

export default Navbar;