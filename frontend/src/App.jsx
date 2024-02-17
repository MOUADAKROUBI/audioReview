import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import DropFileInput from "./components/drop-file-input/DropFileInput";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsOfService from "./components/TermsOfService";

function App() {
  const onFileChange = (files) => {
    console.log(files);
  };

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<DropFileInput onFileChange={(files) => onFileChange(files)} />} />
          <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/termsOfService" element={<TermsOfService />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
