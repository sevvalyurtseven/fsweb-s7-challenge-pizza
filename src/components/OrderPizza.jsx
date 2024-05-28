import { useEffect, useState } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Col,
  Row,
  FormFeedback,
} from "reactstrap";
import "./OrderPizza.css";
import { NavLink, useLocation } from "react-router-dom";
import * as Yup from "yup";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";

const pizzaOptions = {
  boyut: ["Kucuk", "Orta", "Buyuk"],
  hamur: ["İnce", "Normal", "Kalın"],
  ekMalzemeler: [
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
  ],
};

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
};

function OrderPizza() {
  const [formData, setFormData] = useState(initialValues);

  // 1. adım: Formdaki errorleri tutmak için bir state olustur
  const [errors, setErrors] = useState(initialErrors);

  // 2. adım: Formun valid olup olmadıgını kontrol etmek icin bir state olustur
  const [isValid, setIsValid] = useState(false);

  const history = useHistory();

  // 3. adım: Form şemasını olustur
  const orderSchema = Yup.object().shape({
    boyut: Yup.string()
      .oneOf(pizzaOptions.boyut, "Lütfen pizzanız için bir boyut seçin")
      .required("Boyut alanı zorunludur"),
    hamur: Yup.string()
      .oneOf(pizzaOptions.hamur, "Lütfen pizzanız için bir hamur tipi seçin")
      .required("Hamur alanı zorunludur"),
    not: Yup.string()
      .nullable()
      .min(10, "Sipariş notu 10 karakterden az olamaz")
      .max(100, "Sipariş notu 100 karakterden fazla olamaz"),
    ekMalzemeler: Yup.array().max(10, "En fazla 10 malzeme seçebilirsiniz"),
  });

  const location = useLocation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isValid) {
      axios
        .post("https://reqres.in/api/users", formData)
        .then((response) => {
          console.log(response);
          history.push("/success");
          setFormData(initialValues);
        })
        .catch((error) => {
          console.log(error.response.message);
        });
    } else {
      alert("Lütfen gerekli alanları doldurunuz");
    }
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
    const { type, checked, name, value } = event.target;
    let updatedFormData = { ...formData };

    if (type === "checkbox") {
      const updatedEkMalzemeler = checked
        ? [...updatedFormData.ekMalzemeler, value]
        : updatedFormData.ekMalzemeler.filter((item) => item !== value);
      updatedFormData = {
        ...updatedFormData,
        ekMalzemeler: updatedEkMalzemeler,
      };
    } else {
      updatedFormData = { ...updatedFormData, [name]: value };
    }

    setFormData(updatedFormData);

    Yup.reach(orderSchema, name)
      .validate(type === "checkbox" ? updatedFormData.ekMalzemeler : value)
      .then(() => {
        setErrors({ ...errors, [name]: "" });
      })
      .catch((error) => {
        setErrors({ ...errors, [name]: error.errors[0] });
      });
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
              {pizzaOptions.boyut.map((size) => (
                <FormGroup check key={size}>
                  <Label check>
                    <Input
                      type="radio"
                      name="boyut"
                      value={size}
                      checked={formData.boyut === size}
                      onChange={handleChange}
                      invalid={!!errors.boyut}
                    />
                    {size}
                  </Label>
                </FormGroup>
              ))}
              <FormFeedback>{errors.boyut}</FormFeedback>
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
                  invalid={!!errors.hamur}
                >
                  <option value="" disabled>
                    Hamur Kalınlığı
                  </option>
                  {pizzaOptions.hamur.map((dough) => (
                    <option value={dough} key={dough}>
                      {dough}
                    </option>
                  ))}
                </Input>
                <FormFeedback>{errors.hamur}</FormFeedback>
              </Col>
            </FormGroup>
          </div>
          <div className="ek-malzemeler">
            <FormGroup>
              <legend>Ek Malzemeler</legend>
              <p
                className={
                  formData.ekMalzemeler.length > 10 ? "text-danger" : ""
                }
              >
                En fazla 10 malzeme seçebilirsiniz. 5₺
              </p>
              <div className="ek-malzemeler-container">
                {pizzaOptions.ekMalzemeler.map((malzeme, index) => (
                  <div className="ek-malzeme" key={index}>
                    <FormGroup check>
                      <Label check className="ek-malzeme-label">
                        <Input
                          type="checkbox"
                          name="ekMalzemeler"
                          value={malzeme}
                          checked={formData.ekMalzemeler.includes(malzeme)}
                          onChange={handleChange}
                          invalid={!!errors.ekMalzemeler}
                        />
                        {malzeme}
                      </Label>
                    </FormGroup>
                  </div>
                ))}
              </div>
              <FormFeedback>{errors.ekMalzemeler}</FormFeedback>
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
              invalid={!!errors.not}
            />
            <FormFeedback>{errors.not}</FormFeedback>
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
