import "./App.css";
import DropFileInput from "./components/drop-file-input/DropFileInput";

function App() {
  const onFileChange = (files) => {
    console.log(files);
  };

  return (
    <div className="box w-[60vw]">
      <div class="code-input">
        <textarea placeholder="Enter your code here"><span class="important-tag">import</span> { </textarea>
      </div>
      <h2 className="header">drag and drop a audio or click to upload it</h2>
      <DropFileInput onFileChange={(files) => onFileChange(files)} />
    </div>
  );
}

export default App;
