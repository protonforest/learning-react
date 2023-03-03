import React from "react";
import './App.css';
import PropTypes from "prop-types";
import { Button } from '@mui/material'

// onSelect is a customEvent we defined 
const PokemonRow = ({ pokemon, onSelect }) => ( 
  <tr>
    <td>{pokemon.name.english}</td>
    <td>{pokemon.type.join(', ')}</td>
    <td>
      <Button variant="contained" color="primary"
        onClick={() => onSelect(pokemon)}>Select!</Button>
    </td>
  </tr>
);

PokemonRow.propTypes = {
  pokemon: PropTypes.shape({
    name: PropTypes.shape({
      english: PropTypes.string.isRequired,
    }),
    type: PropTypes.arrayOf(PropTypes.string.isRequired)
  }),
  onSelect: PropTypes.func.isRequired,
}

const PokemonInfo = ({ name, base }) => (
  <div>
    <h1>{name.english}</h1>
    <table>
      {Object.keys(base).map(key => (
        <tr key={key}>
          <td>{key}</td>
          <td>{base[key]}</td>
        </tr>
      ))}
    </table>
  </div>
)

PokemonInfo.propTypes = {
  name: PropTypes.shape({
    english: PropTypes.string.isRequired,
  }),
  base: PropTypes.shape({
    HP: PropTypes.number.isRequired,
    Attack: PropTypes.number.isRequired,
    Defense: PropTypes.number.isRequired,
    "Sp. Attack": PropTypes.number.isRequired,
    "Sp. Defense": PropTypes.number.isRequired,
    Speed: PropTypes.number.isRequired,
  }),
}

// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       filter: "",
//       pokemon: [], 
//       selectedItem: null,
//     }
//   }

//   componentDidMount() {
//     try {
//       fetch("http://localhost:3000/starting-react/pokemon.json")
//       .then(resp => resp.json())
//       .then(pokemon => this.setState({ ...this.state, pokemon})); //short hand syntax.
//     } catch (err) {
//       console.log(err.message);
//     }
//   }

//     async handleFetch () {
//     try {
//       fetch("http://localhost:3000/starting-react/pokemon.json")
//       .then(resp => resp.json())
//       .then(data => this.setState({ ...this.state, pokemon: data })); 
//     } catch (err) {
//       console.log(err.message);
//     }
//   };


//   render () {
//     return (
//     <div
//       style= {{
//         margin: "auto",
//         width: 800,
//         paddingTop: "1rem",
//       }}>
//     <h1 className="title">Pokemon Search</h1>
//     <Button variant="contained" type="submit" onClick= {() => {this.handleFetch();} }>Fetch Data</Button>
    
//     <div 
//       style={{
//         display: 'grid',
//         gridTemplateColumns: "70% 30%",
//         gridColumnGap: "1rem"
//       }}
//     >
//       <div>

//         <input value={this.state.filter} 
//         onChange={(evt) => this.setState({
//           ... this.state, 
//           filter: evt.target.value
//         })}/> 
//         <table width="100%">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Type</th>
//             </tr>
//           </thead>
//           <tbody>
//             {this.state.pokemon
//             .filter((pokemon) => pokemon.name.english.toLowerCase().includes(this.state.filter.toLowerCase()))
//             .map(pokemon => (
//               <PokemonRow pokemon={pokemon} key={pokemon.id} onSelect={(pokemon) => this.setState({
//                 ... this.state,
//                 selectedItem: pokemon,
//               })} />
//             ))}
//           </tbody>
//         </table>
//       </div>
//       {this.state.selectedItem && <PokemonInfo {... this.state.selectedItem} />}
//       {this.state.filter || (
//         <h1>no filter</h1>
//       )}
//     </div>
    
//     </div>
//     )  
//   }
// }


function App() {
  //filter is the state/object, filterSet is a function that sets the filter. Also people use convention "setFilter"
  const [filter, filterSet] = React.useState("");
  const [selectedItem, selectedItemSet] = React.useState(null);
  const [pokemon, pokemonSet] = React.useState([]);


  // React.useEffect(() => {
  //   fetch("http://localhost:3000/starting-react/pokemon.json")
  //     .then(resp => resp.json())
  //     .then(data => pokemonSet(data)); 
  // }, []);
  
  const handleFetch = async () => {
    try {
      fetch("http://localhost:3000/starting-react/pokemon.json")
      .then(resp => resp.json())
      .then(data => pokemonSet(data)); 
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div
      style= {{
        margin: "auto",
        width: 800,
        paddingTop: "1rem",
      }}>
    <h1 className="title">Pokemon Search</h1>
    <Button variant="contained" type="submit" onClick= {handleFetch}>Fetch Data</Button>
    
    <div 
      style={{
        display: 'grid',
        gridTemplateColumns: "70% 30%",
        gridColumnGap: "1rem"
      }}
    >
      <div>
      {/* invisible connection here.  
      value=filter says set the value of text in the input box to be equal to the "filter", a react state variable 
      that react watches for state changes. so whenever the value changes, filter changes. 

      the actual handling of the event needs to happen through filterSet. so setting it is 2 parts, declaring the 
      data equality, then processing it.

      onChange is called whenever an input field changes. thats part of html. 

      We set onChange equal to an anonymous function we're defining inline, and we're saying that this anonymous function 
      takes a input variable we call evt, and react here will know to pass in a variable invisibly (built-in to react),
      and this variable has predefined properties ".target.value". thats how you access it. 

      "An onChange event handler returns a Synthetic Event object which 
      contains useful meta data such as the target input’s id, name, and current value."

      Then we call the filterSet function defined above that "connects" this variable passed to us by react. 

      We could have not used an anonymous function and defined a function elsewhere to make it easier, but this is less code. 

      
      */}
        <input value={filter} onChange={(evt) => filterSet(evt.target.value)}/> 
        <table width="100%">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {pokemon
            .filter((pokemon) => pokemon.name.english.toLowerCase().includes(filter.toLowerCase()))
            .map(pokemon => (
              //this is where we connect the 2 states. 
              <PokemonRow pokemon={pokemon} key={pokemon.id} onSelect={(pokemon) => selectedItemSet(pokemon)} />
            ))}
          </tbody>
        </table>
      </div>
      {/* Open Curly Braces, and give it your conditional, if selectedItem exists and html code you wanna display.  */}
      {/* This is a cool trick. must learn. 
      Basically this is how you conditionally show state variables.
      */}
      {selectedItem && (
        <PokemonInfo {...selectedItem} />
      )}
      {filter || (
        <h1>no filter</h1>
      )}
    </div>
    
    </div>
  );
}

export default App;
