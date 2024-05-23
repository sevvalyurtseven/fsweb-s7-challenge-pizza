import { useState } from "react";
import { Form, FormGroup, Label, Input, Button, Col, Row } from "reactstrap";
const ekMalzemeler = [
  "Pepperoni",
  "Sosis",
  "Kanada Jambonu",
  "Tavuk Izgara",
  "Soğan",
  "Domates",
  "Mısır",
  "Sucuk",
  "Jalapeno",
  "Sarımsak",
  "Biber",
  "Ananas",
  "Kabak",
];

const initialValues = {
  boyut: "",
  hamur: "",
  ekMalzemeler: [],
  not: "",
  miktar: 1,
};

function OrderPizza() {
  const [formData, setFormData] = useState(initialValues);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    setFormData(initialValues);
  };

  const handleChange = (event) => {
    const { type, checked } = event.target;
    let { name, value } = event.target;
    const updatedPizzaForm = { ...formData };

    if (type === "checkbox") {
      if (checked) {
        updatedPizzaForm.ekMalzemeler.push(name);
      } else {
        const index = updatedPizzaForm.ekMalzemeler.indexOf(name);
        updatedPizzaForm.ekMalzemeler.splice(index, 1);
      }
      name = "ekMalzemeler";
      value = updatedPizzaForm.ekMalzemeler;
    } else {
      updatedPizzaForm[name] = value;
    }
    console.log(updatedPizzaForm);
    setFormData(updatedPizzaForm);
  };

  const handleIncrease = () => {
    setFormData({ ...formData, miktar: formData.miktar + 1 });
  };
  const handleDecrease = () => {
    if (formData.miktar > 1) {
      setFormData({ ...formData, miktar: formData.miktar - 1 });
    }
  };

  return (
    <div className="order-pizza">
      <header>
        <h1>TEKNOLOJİK YEMEKLER</h1>
      </header>
      <section>
        <h3>Position Absolute Acı Pizza</h3>
        <p>
          <span>85.50₺</span>
          <span>4.9</span>
          <span>(200)</span>
        </p>
        <p>
          Frontend Dev olarak hala position:absolute kullanıyorsan bu çok acı
          pizza tam sana göre. Pizza, domates, peynir ve genellikle çeşitli
          diğer malzemelerle kaplanmış, daha sonra geleneksel olarak odun
          ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle yuvarlak,
          düzleştirilmiş mayalı buğday bazlı hamurdan oluşan İtalyan kökenli
          lezzetli bir yemektir.. Küçük bir pizzaya bazen pizzetta denir.
        </p>
        <Form className="order-pizza-form" onSubmit={handleSubmit}>
          <FormGroup tag="fieldset">
            <legend>Boyut Seç</legend>
            <FormGroup check>
              <Label check>
                <Input
                  type="radio"
                  name="boyut"
                  value="Küçük"
                  checked={formData.boyut === "Küçük"}
                  onChange={handleChange}
                />
                Küçük
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input
                  type="radio"
                  name="boyut"
                  value="Orta"
                  checked={formData.boyut === "Orta"}
                  onChange={handleChange}
                />
                Orta
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input
                  type="radio"
                  name="boyut"
                  value="Büyük"
                  checked={formData.boyut === "Büyük"}
                  onChange={handleChange}
                />
                Büyük
              </Label>
            </FormGroup>
          </FormGroup>
          <FormGroup row>
            <Label for="hamur" sm={6}>
              Hamur Seç
            </Label>
            <Col sm={10}>
              <Input
                id="hamur"
                name="hamur"
                type="select"
                onChange={handleChange}
                value={formData.hamur}
              >
                <option value="" disabled>
                  Hamur Kalınlığı
                </option>
                <option value="İnce">İnce</option>
                <option value="Normal">Normal</option>
                <option value="Kalın">Kalın</option>
              </Input>
            </Col>
          </FormGroup>
          <div className="ek-malzemeler">
            <FormGroup>
              <legend>Ek Malzemeler</legend>
              <p>En fazla 10 malzeme seçebilirsiniz. 5₺</p>
              {ekMalzemeler.map((malzeme, index) => (
                <FormGroup check key={index}>
                  <Label check>
                    <Input
                      type="checkbox"
                      name={malzeme}
                      checked={formData.ekMalzemeler.includes(malzeme)}
                      onChange={handleChange}
                    />
                    {malzeme}
                  </Label>
                </FormGroup>
              ))}
            </FormGroup>
          </div>
          <FormGroup>
            <Label for="siparisNotu">Sipariş Notu</Label>
            <Input
              type="textarea"
              id="siparisNotu"
              name="not"
              value={formData.not}
              onChange={handleChange}
              placeholder="Siparişine eklemek istediğin bir not var mı?"
            />
            <Row className="order-summary">
              <Col md="6" className="quantity">
                <Button color="secondary" outline onClick={handleDecrease}>
                  -
                </Button>
                <Input type="number" value={formData.miktar} readOnly />
                <Button color="secondary" outline onClick={handleIncrease}>
                  +
                </Button>
              </Col>
            </Row>
          </FormGroup>
        </Form>
      </section>
    </div>
  );
}

export default OrderPizza;
