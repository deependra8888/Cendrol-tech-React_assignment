import { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { Panel, Modal, Button, Placeholder } from "rsuite";

function App() {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState();
  const [category, setCategory] = useState("");
  const [joke, setJoke] = useState("");
  const [loading, setloading] = useState(false);
  useEffect(() => {
    
    fetch("https://api.chucknorris.io/jokes/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      });
  }, []);

  const fetchJokes = async (category) => {
    let res = await fetch(
      `https://api.chucknorris.io/jokes/random?category=${category}`
    );
    let data = await res.json();
    return data;
  };

  const handlePanelClick = async (category) => {
    setOpen(true)
    setloading(true);
    let data = await fetchJokes(category);
    let { value } = data;
    setloading(false);
    setCategory(category);
    setJoke(value);
  };

  return (
    <div className="App">
      <h1>Chuck Norris Jokes</h1>
      <div className="container">
        {categories &&
          categories.map((category, indx) => {
            return (
              <Panel
                onClick={() => handlePanelClick(category)}
                className="panel"
                key={indx}
                bordered
              >
                <strong>
                  {category[0].toUpperCase() + category.substring(1)}
                </strong>
                <p>
                  Unlimited Jokes on
                  {category[0].toUpperCase() + category.substring(1)}
                </p>
              </Panel>
            );
          })}
        {!categories && (
          <ReactLoading type={"bars"} color={"blue"} height={667} width={375} />
        )}
        <Modal open={open} onClose={() => setOpen(false)}>
          <Modal.Header>
            <Modal.Title>{loading ? '' : category && (category[0]?.toUpperCase() + category.substring(1))}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {loading ? <Placeholder.Paragraph /> : <p>{joke}</p>}
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() => handlePanelClick(category)}
              appearance="primary"
            >
              Next Joke
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default App;
