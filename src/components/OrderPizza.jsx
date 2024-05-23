import { useEffect, useState } from "react";
import { Form, FormGroup, Label, Input, Button, Col, Row } from "reactstrap";
import "./OrderPizza.css";
import { NavLink, useLocation } from "react-router-dom";
import * as Yup from "yup";
const ekMalzemeler = [
  "Pepperoni",
  "Sosis",
  "Kanada Jambonu",
  "Tavuk Izgara",
  "Soğan",
  "Domates",
  "Mısır",
  "Sucuk",
  "Jalepeno",
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

const initialErrors = {
  boyut: "",
  hamur: "",
  ekMalzemeler: "",
  not: "",
  miktar: "",
};

function OrderPizza() {
  const [formData, setFormData] = useState(initialValues);

  // 1. adım: Formdaki errorleri tutmak için bir state olustur
  const [errors, setErrors] = useState(initialErrors);

  // 2. adım: Formun valid olup olmadıgını kontrol etmek icin bir state olustur
  const [isValid, setIsValid] = useState(false);

  // 3. adım: Form şemasını olustur

  const orderSchema = Yup.object().shape({
    boyut: Yup.string().required("Lütfen pizzanız için bir boyut seçiniz."),

    hamur: Yup.string().required(
      "Lütfen pizzanız için bir hamur türü seçiniz."
    ),
    ekMalzemeler: Yup.array().max(5, "En fazla 5 malzemeyi seçebilirsiniz."),

    not: Yup.string()
      .min(5, "Girdiğiniz not en az 5 karakter olmalıdır.")
      .max(50, "Girdiğiniz not en fazla 50 karakter olmalıdır."),
  });

  const location = useLocation();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    setFormData(initialValues);
  };

  // 4. adım: Formun valid olup olmadıgını kontrol etmek

  useEffect(() => {
    orderSchema
      .isValid(formData)
      .then((valid) => {
        setIsValid(valid);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [formData]);

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

  const calculateExtraCost = () => {
    return formData.ekMalzemeler.length * 5;
  };

  const calculateTotalPrice = () => {
    const pizzaPrice = 85.5;
    const extraCost = calculateExtraCost();
    return (pizzaPrice + extraCost) * formData.miktar;
  };

  return (
    <div className="order-pizza-container">
      <header className="order-header">
        <h1 className="order-title">Teknolojik Yemekler</h1>

        <nav className="order-nav">
          <NavLink exact to="/" activeClassName="active">
            Anasayfa
          </NavLink>
          <span>-</span>
          {location.pathname === "/order-pizza" ? (
            <span className="active">Sipariş Oluştur</span>
          ) : (
            <NavLink to="/order-pizza" activeClassName="active">
              Sipariş Oluştur
            </NavLink>
          )}
        </nav>
      </header>
      <div className="order-form-container">
        <Form className="order-pizza-form" onSubmit={handleSubmit}>
          <h3 className="pizza-title">Position Absolute Acı Pizza</h3>
          <p className="pizza-info">
            <span className="pizza-price">85.50₺</span>
            <span className="pizza-rating">4.9</span>
            <span className="pizza-reviews">(200)</span>
          </p>
          <p className="pizza-description">
            Frontend Dev olarak hala position:absolute kullanıyorsan bu çok acı
            pizza tam sana göre. Pizza, domates, peynir ve genellikle çeşitli
            diğer malzemelerle kaplanmış, daha sonra geleneksel olarak odun
            ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle
            yuvarlak, düzleştirilmiş mayalı buğday bazlı hamurdan oluşan İtalyan
            kökenli lezzetli bir yemektir.. Küçük bir pizzaya bazen pizzetta
            denir.
          </p>
          <div className="pizza-options">
            <FormGroup tag="fieldset" className="pizza-size">
              <legend>
                Boyut Seç<span>*</span>
              </legend>
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
            <FormGroup row className="pizza-dough">
              <Label sm={6} for="hamur">
                <legend>
                  Hamur Seç<span>*</span>
                </legend>
              </Label>
              <Col sm={7}>
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
          </div>
          <div className="ek-malzemeler">
            <FormGroup>
              <legend>Ek Malzemeler</legend>
              <p>En fazla 10 malzeme seçebilirsiniz. 5₺</p>
              <div className="ek-malzemeler-container">
                {ekMalzemeler.map((malzeme, index) => (
                  <div className="ek-malzeme" key={index}>
                    <FormGroup check>
                      <Label check className="ek-malzeme-label">
                        <Input
                          type="checkbox"
                          name={malzeme}
                          checked={formData.ekMalzemeler.includes(malzeme)}
                          onChange={handleChange}
                        />
                        {malzeme}
                      </Label>
                    </FormGroup>
                  </div>
                ))}
              </div>
            </FormGroup>
          </div>
          <FormGroup className="order-note">
            <Label for="siparisNotu">Sipariş Notu</Label>
            <Input
              type="textarea"
              id="siparisNotu"
              name="not"
              value={formData.not}
              onChange={handleChange}
              placeholder="Siparişine eklemek istediğin bir not var mı?"
            />
          </FormGroup>
          <hr />
          <Row className="order-summary">
            <Col md="4" className="quantity-container">
              <Button color="warning" onClick={handleDecrease}>
                -
              </Button>

              <Input
                type="number"
                className="pb-3 pt-4 text-center"
                value={formData.miktar}
                readOnly
              />

              <Button color="warning" onClick={handleIncrease}>
                +
              </Button>
            </Col>
            <Col md="7" className="summary">
              <h3>Sipariş Toplamı</h3>
              <p className="order-price">
                Seçimler<span>{calculateExtraCost()}₺</span>{" "}
              </p>
              <p className="total-price">
                Toplam<span>{calculateTotalPrice().toFixed(2)}₺</span>
              </p>
              <Button color="warning" size="lg" className="p-3" block>
                SİPARİŞ VER
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
}

export default OrderPizza;
