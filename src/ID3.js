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
  
renderInput ( {getInputProps, closeMenu, inputValue} ) {
  return (
    <TextField
      InputProps={{ classes: { root: this.props.classes.inputRoot, }, 
        ...getInputProps({ placeholder: this.props.placeholder, id: this.props.id, }), 
        onBlur: closeMenu, }}
      fullWidth={true}
    />
  );
}

getSuggestions(inputValue) {
  let count = 0;
  let ret = this.props.suggestions.filter(suggestion => {
    const keep =
      (!inputValue || suggestion.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1) &&
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
  const isSelected = (selectedItem || '').indexOf(suggestion.label) > -1;
  let itemProps = getItemProps({ item: suggestion }) ;
  return (
    <MenuItem
      {...itemProps}
      key={suggestion}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400,
      }}
    >
      {suggestion}
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
          onStateChange={({ inputValue }) => { return inputValue && this.setState({ inputValue }) }}
          selectedItem={this.state.inputValue}
        >
          {p => (
            <div className={this.props.classes.container}>
            {this.renderInput(p)}
            {this.renderSuggestions (p)}
            </div>
          )}
        </Downshift>
    );
  }
}

export default withStyles(styles)(IntegrationDownshift);
