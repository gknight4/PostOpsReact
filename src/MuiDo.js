import React, { Component } from 'react';
import Downshift from 'downshift';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
//import Select from '@material-ui/core/Select';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
//import InputLabel from '@material-ui/core/InputLabel';
//import FormControl from '@material-ui/core/FormControl';

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

itemToString = item => (item ? item : "");

renderInput ( {getInputProps} ) {
  let ip = getInputProps({ placeholder: this.props.placeholder, id: this.props.id, });
//  console.log(this.props.classes.inputRoot);
  return (
    <TextField
      InputProps={{ classes: { root: this.props.classes.inputRoot, }, ...ip, }} // inputRef: ref, 
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

downshiftProps (){
  console.log(this.props);
  return {
    ...this.props.input,
    itemToString: this.itemToString,
    selectedItem: this.props.input.value,
//    inputValue: "this"
  }
}

  render (){
    return (
  <Downshift {...this.downshiftProps()} >
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

let InDo = withStyles(styles)(IntegrationDownshift);
export default InDo ; // props => <Field name={props.name} component={InDo} {...props} />;

