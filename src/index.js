import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

const Message = ({ value, color, fontSize, fontWeight }) => (
  <span style={{ color, fontSize, fontWeight }}>{value}</span>
);

class Button extends React.Component {
  render() {
    return <button> {this.props.children} </button>;
  }
}

const TonyStark = props => {
  console.log(props);
  return <p>{JSON.stringify(props)}</p>;
};

const withGloves = Component => {
  return class extends React.Component {
    render() {
      return <Component gloves {...this.props} />;
    }
  };
};

const withBoots = Component => {
  return class extends React.Component {
    render() {
      return <Component boots {...this.props} />;
    }
  };
};

const withArmor = Component => {
  return class extends React.Component {
    render() {
      return <Component armor {...this.props} />;
    }
  };
};

const withHelmet = Component => {
  return class extends React.Component {
    render() {
      return <Component helmet {...this.props} />;
    }
  };
};

const IronMan = withGloves(withBoots(withArmor(withHelmet(TonyStark))));

const Form = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <input />
      <input type="submit" />
    </form>
  );
};

const reduxForm = (options = {}) => {
  const handleSubmit = e => {
    e.preventDefault();
    options.onSubmit();
  };
  return Component => {
    return () => <Component handleSubmit={handleSubmit} />;
  };
};

const Select = ({ options }) => {
  const onChange = e => {
    console.log(e.target.value);
  };
  const opt = options.map(opt => {
    return (
      <option key={opt.value} value={opt.value}>
        {opt.label}
      </option>
    );
  });
  return <select onChange={onChange}>{opt}</select>;
};

const withOptions = options => {
  return Component => {
    return () => <Component options={options} />;
  };
};

function App() {
  const options = [
    {
      value: "NI",
      label: "Nicaragua"
    },
    {
      value: "CR",
      label: "Costa Rica"
    },
    {
      value: "SV",
      label: "San Salvador"
    },
    {
      value: "HN",
      label: "Honduras"
    },
    {
      value: "GT",
      label: "Guatemala"
    }
  ];

  const hoc = withOptions(options);
  console.log(hoc);

  const SelectComponent = withOptions(options)(Select);

  const Formulario = reduxForm({
    onSubmit: () => console.log("formulario enviado")
  })(Form);

  return (
    <div className="App">
      <Formulario />
      <SelectComponent />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
