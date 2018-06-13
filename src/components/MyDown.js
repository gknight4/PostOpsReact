import React, { Component } from 'react';
//import PropTypes from 'prop-types';
//import keycode from 'keycode';
import Downshift from 'downshift';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
//import Chip from '@material-ui/core/Chip';

/*const suggestions = [
  { label: 'Afghanistan' },
  { label: 'Aland Islands' },
  { label: 'Albania' },
];*/

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 250,
  },
  container: {
    flexGrow: 1,
    position: 'relative',
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
  },
  inputRoot: {
    flexWrap: 'wrap',
  },
});


class IntegrationDownshift extends Component {
  constructor(props){
    super(props);
    this.state = {
      inputValue: this.props.inputValue,
    }
  }
  
onBlur = closeMenu =>{
  closeMenu();
  if (this.props.onBlur) this.props.onBlur();
}
  
renderInput ( {getInputProps, closeMenu, inputValue, selectedItem, label} ) {
//  console.log("inval: " + inputValue + ", " + this.state.inputValue + ", " + (inputValue === this.props.inputValue));
//  console.log(getInputProps().value);
  return (
    <TextField
      InputProps={{ classes: { root: this.props.classes.inputRoot, }, 
        ...getInputProps({ placeholder: this.props.placeholder, id: this.props.id, value: inputValue,
          }),  // , value: this.props.inputValue
// value: inputValue === this.props.inputValue ? inputValue : this.props.inputValue          
        onBlur: e=>{this.onBlur(closeMenu)}
      }}
      label= {this.props.label}
      fullWidth={true}
    />
  );
}

getSuggestions(inputValue) {
//  console.log(this.props.suggestions);
  if (this.props.suggestions == null){ return []}
  let count = 0;
  let ret = this.props.suggestions.filter(suggestion => {
    const keep =
      (!inputValue || suggestion/*.text*/.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1) &&
      count < 5;
    if (keep) {
      count += 1;
    }
    return keep;
  });
  return ret ;
}

renderSuggestion({ suggestion, index, getItemProps, highlightedIndex, selectedItem }) {
  const isHighlighted = highlightedIndex === index;
  const isSelected = (selectedItem || '').indexOf(suggestion/*.text*/) > -1;
  let itemProps = getItemProps({ item: suggestion/*.text*/ }) ;
  return (
    <MenuItem
      {...itemProps}
      key={suggestion/*.text*/}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400,
      }}
    >
      {suggestion/*.text*/}
    </MenuItem>
  );
}

renderSuggestions ( {isOpen, inputValue, getItemProps, highlightedIndex, selectedItem} ){
//  console.log (this.props.classes) ;
  return (
    isOpen ? (
      <Paper className={this.props.classes.paper} square>
        {this.getSuggestions(inputValue).map((suggestion, index) =>
          this.renderSuggestion({ suggestion, index, getItemProps, highlightedIndex, selectedItem, }),
        )}
      </Paper>
    ) : null
  )
}
/*          onChange={selection => alert(`You selected ${selection}`)}
*/
render(){
    return (
        <Downshift
          onStateChange={e => { /*console.log(e) ;*/ if 
            ((e.type === "__autocomplete_change_input__")  ||
            (e.type === "__autocomplete_keydown_enter__")  ||
            (e.type === "__autocomplete_click_item__"))
          this.props.setValue({ value: e.inputValue, index: this.props.index}); 
            return e.inputValue && this.setState({ inputValue: e.inputValue }) }} // 
// "__autocomplete_keydown_enter__"  "__autocomplete_click_item__"           
          selectedItem={this.props.inputValue}
        >
          {p => {/*console.log(p) ;*/ return (
            <div className={this.props.classes.container}>
            {this.renderInput(p)}
            {this.renderSuggestions (p)}
            </div>
          )}}
        </Downshift>
    );
  }
}

export default withStyles(styles)(IntegrationDownshift);
