import React, { useState, Component, Fragment } from "react";
import RichTextEditor from "react-rte";
import {
  Steps,
  Button,
  Whisper,
  IconButton,
  Icon,
  Tooltip,
  Input,
  Schema,
  ControlLabel,
  FormControl,
  FormGroup,
  Form,
  Column,
  SelectPicker,
  InputNumber,
  FlexboxGrid,
  Notification,
  Modal,
  Row,
  Uploader,
  Message,
  Table,
  Panel,
  Toggle,
  Divider,
} from "rsuite";
import ProductServices from "./ProductServices";
import verifyToken from "../../Partials/Authentication";
import productInit from "../../Partials/product";

export default class CreateProductContainer extends Component {
  constructor() {
    super();
    this.state = {
      stepsCurrent: 0,
      stepsError: null,
      productName: "",
      productModel: "",
      productSKU: "",
      productPrice: "",
      ProductSalePrice: "",
      productColour: "",
      basicInfoDisplay: "block",
      basicSpecificationDisplay: "none",
      productNameError: null,
      productModelError: null,
      productSKUError: null,
      productPriceError: null,
      ProductSalePriceError: null,
      productColourError: null,
      disabledPreviousButton: true,
      showDraftModal: false,
      savedProduct: "",
      productMediaDisplay: "none",
      productServicesDisplay: "none",
      draftBtnLoading: false,
      nextBtnLoading: false,
      nextBtnText: "Next",
      ProductSpecification: RichTextEditor.createEmptyValue(),
      ProductManufacturerInfo: RichTextEditor.createEmptyValue(),
      ProductWarrantyInfo: RichTextEditor.createEmptyValue(),
      ProductUserManual: RichTextEditor.createEmptyValue(),
    };
    this.next = this.next.bind(this);
    this.validateInput = this.validateInput.bind(this);
    this.saveDraft = this.saveDraft.bind(this);
  }

  validateInput(text, errorMessage) {
    if (text === "" || text === undefined || text === null) {
      return errorMessage;
    }
    return null;
  }

  async next() {
    console.log(this.props);

    /**
     * Switch screens
     */

    switch (this.state.stepsCurrent) {
      case 0:
        this.setState({ nextBtnLoading: true });
        /**
         * Validate data
         */
        if (
          this.state.productName !== "" &&
          this.state.productModel !== "" &&
          this.state.productPrice !== "" 
          // this.state.productNameError === null &&
          // this.state.productModelError === null &&
          // this.state.productPriceError === null
        ) {
          /**
           * Navigate to next slide
           */

          /**
           * Verify token before creating product
           */
          const TOKEN = localStorage.getItem("token");
          const decodedToken = await verifyToken(TOKEN);
          const seller = await JSON.parse(decodedToken.sellerData);
          const sellerId = seller.id;

          /**
           * Post to endpoint to create product
           */

          const productBasicInfo = {
            productName: this.state.controlName,
            productModel: this.state.productModel,
            productSKU: this.state.productSKU,
            productPrice: this.state.productPrice,
            ProductSalePrice: this.state.ProductSalePrice,
            productColour: this.state.productColour,
            ProductDescription: this.state.ProductDescription,
            sellerId: sellerId,
          };

          await productInit({ productBasicInfo })
            .then((response) => console.log(response))
            .catch((err) => console.error(err));

          this.setState({
            basicInfoDisplay: "none",
            productMediaDisplay: "none",
            productServicesDisplay: "none",
            basicSpecificationDisplay: "block",
            stepsCurrent: 1,
            disabledPreviousButton: false,
          });
        } else {
          this.setState({ stepsError: "error" });
          if (this.state.productName === "") {
            this.setState({
              productNameError: "Product name can not be empty",
            });
          }
          if (this.state.productModel === "") {
            this.setState({
              productModelError:
                "Product should have a product model or version number",
            });
          }
          if (this.state.productPrice === "") {
            this.setState({
              productPriceError: "Please indicate the price of the product",
            });
          }
        }
        this.setState({ nextBtnLoading: false });

        break;
      case 1:
        this.setState({
          basicInfoDisplay: "none",
          basicSpecificationDisplay: "none",
          productServicesDisplay: "none",
          stepsCurrent: 2,
          disabledPreviousButton: false,
          productMediaDisplay: "block",
        });
        break;
      case 2:
        this.setState({
          basicInfoDisplay: "none",
          basicSpecificationDisplay: "none",
          productServicesDisplay: "block",
          stepsCurrent: 3,
          disabledPreviousButton: false,
          productMediaDisplay: "none",
          nextBtnText: "Finish",
        });
        break;
      case 3:
        alert("done");
        break;
      default:
    }
  }

  previous(stepsCurrent) {
    switch (stepsCurrent) {
      case 0:
        this.setState({
          disabledPreviousButton: true,
        });
      case 1:
        this.setState({
          basicSpecificationDisplay: "none",
          productMediaDisplay: "none",
          productServicesDisplay: "none",
          stepsCurrent: 0,
          basicInfoDisplay: "block",
          disabledPreviousButton: false,
        });
        break;
      case 2:
        this.setState({
          basicSpecificationDisplay: "block",
          stepsCurrent: 1,
          basicInfoDisplay: "none",
          productServicesDisplay: "none",
          productMediaDisplay: "none",
          disabledPreviousButton: false,
        });
        break;
      case 3:
        this.setState({
          basicSpecificationDisplay: "none",
          productServicesDisplay: "none",
          stepsCurrent: 2,
          basicInfoDisplay: "none",
          productMediaDisplay: "block",
          disabledPreviousButton: false,
        });
        break;

      default:
        break;
    }
  }

  async saveDraft() {
    this.setState({ draftBtnLoading: true });
    /**
     * Save draft saves filled products to AsyncStorage
     */

    const formData = {
      productName: this.state.productName,
      productModel: this.state.productModel,
      productSKU: this.state.productSKU,
      productPrice: this.state.productPrice,
      ProductSalePrice: this.state.ProductSalePrice,
      productColour: this.state.productColour,
    };

    if (formData.productName !== "") {
      try {
        await localStorage.setItem(
          "savedProductsData",
          JSON.stringify(formData)
        );
        Notification["success"]({
          title: "Saved",
          description: `${formData.productName} has been successfully saved, you can come back later to finish uploading your product. Ensure you do not clean your browser cache `,
        });
      } catch (error) {
        Notification["error"]({
          title: "Draft Error",
          description: "Could not save data, Try again or contact Tech support",
        });
        console.log(error);
      }
    } else {
      this.setState({
        productNameError:
          "You need to fill the name field before saving to draft",
      });
      Notification["error"]({
        title: "Product Name",
        description:
          "Product name cannot be empty, Please fill in a product name",
      });
    }
    this.setState({ draftBtnLoading: false });
  }

  async componentDidMount() {
    /**
     * Saved draft from the localStorage
     */
    var savedProduct = await JSON.parse(
      localStorage.getItem("savedProductsData")
    );
    /**
     * Check if there is saved draft
     */
    if (savedProduct) {
      this.setState({
        showDraftModal: true,
        savedProduct: savedProduct,
      });
    }
  }

  render() {
    const tooltip = (
      <Tooltip>
        This is a help <i> tooltip </i> .
      </Tooltip>
    );
    const { StringType, NumberType } = Schema.Types;
    const model = Schema.Model({
      productName: StringType().isRequired("This field is required."),
      productModel: StringType().isRequired("This field is required."),
      productSKU: StringType().isRequired("This field is required."),
      productPrice: StringType().isRequired("This field is required."),
      ProductSalePrice: StringType().isRequired("This field is required."),
      productColour: StringType().isRequired("This field is required."),
    });

    /**
     * List of all input fields
     */

    const inputArray = [
      {
        id: 1,
        label: "Product Name",
        isRequired: true,
        controlName: "productName",
        value: this.state.productName,
        onChange: (text) => this.setState({ productName: text }),
        onBlur: (text) =>
          this.setState({
            productNameError: this.validateInput(text),
          }),
        type: "text",
        errorMessage: this.state.productNameError,
      },
      {
        id: 2,
        label: "Product Model",
        isRequired: true,
        controlName: "productModel",
        value: this.state.productModel,
        onChange: (text) => this.setState({ productModel: text }),
        onBlur: (text) =>
          this.setState({
            productModelError: this.validateInput(text),
          }),
        type: "text",
        errorMessage: this.state.productModelError,
      },
      {
        id: 3,
        label: "Unique SKU number",
        controlName: "productSKU",
        value: this.state.productSKU,
        onChange: (text) => this.setState({ productSKU: text }),
        onBlur: (text) =>
          this.setState({
            productSKUError: this.validateInput(text),
          }),
        type: "text",
        errorMessage: this.state.productSKUError,
      },
      {
        id: 4,
        label: "Product Price",
        controlName: "productPrice",
        value: this.state.productPrice,
        onChange: (text) => this.setState({ productPrice: text }),
        type: "number",
        errorMessage: this.state.productPriceError,
        inputCurrency: true,
        value: this.state.productPrice,
      },
      {
        id: 5,
        label: "Product Sale Price",
        controlName: "ProductSalePrice",
        value: this.state.ProductSalePrice,
        onChange: (text) => this.setState({ ProductSalePrice: text }),
        type: "text",
        errorMessage: this.state.ProductSalePriceError,
        inputCurrency: true,
        value: this.state.ProductSalePrice,
      },
      {
        id: 6,
        label: "Product Primary Colour",
        controlName: "productColour",
        value: this.state.productColour,
        onChange: (text) => this.setState({ productColour: text }),
        onBlur: (text) =>
          this.setState({
            productColourError: this.validateInput(text),
          }),
        type: "color",
        errorMessage: this.state.productColourError,
      },
      {
        id: 7,
        label: "Product Description",
        controlName: "ProductDescription",
        value: this.state.ProductDescription,
        onChange: (text) => this.setState({ ProductDescription: text }),
        onBlur: (text) =>
          this.setState({
            ProductDescriptionError: this.validateInput(text),
          }),
        type: "color",
        componentClass: "textarea",
        errorMessage: this.state.productColourError,
      },
    ];
    const { savedProduct } = this.state;

    return (
      <Fragment>
        <Modal
          backdrop={true}
          show={this.state.showDraftModal}
          onHide={() => this.setState({ showDraftModal: false })}
          size="xs"
        >
          <Modal.Body>
            <Icon
              icon="info"
              style={{
                color: "#ffb300",
                fontSize: 24,
              }}
            />
            You have a product you saved in draft, will you like to continue
            from where you stopped ?
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() => {
                this.setState({
                  productName: savedProduct.productName,
                  productModel: savedProduct.productModel,
                  productSKU: savedProduct.productSKU,
                  productPrice: savedProduct.productPrice,
                  ProductSalePrice: savedProduct.ProductSalePrice,
                  productColour: savedProduct.productColour,
                });
                this.setState({ showDraftModal: false });
              }}
              appearance="primary"
            >
              Ok
            </Button>
            <Button
              onClick={() => this.setState({ showDraftModal: false })}
              appearance="subtle"
            >
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
        <div className="m-4">
          <Steps
            current={this.state.stepsCurrent}
            currentStatus={this.state.stepsError}
          >
            <Steps.Item title="Basic product Information" />
            <Steps.Item title="Product Specifications" />
            <Steps.Item title="Upload Product Image" />
            <Steps.Item title="Add Services to product" />
          </Steps>
        </div>
        <hr className="my-4" />
        {/* 

                            Basic info Tab
                        
                         */}
        <div
          className="form-horizontal form-label-left"
          style={{
            display: this.state.basicInfoDisplay,
            justifyContent: "center",
          }}
        >
          <div className="form-group row">
            <Form model={model} layout="inline">
              <FormGroup>
                {inputArray.map((inputField) => (
                  <div
                    key={inputField.key}
                    style={{
                      margin: 20,
                      marginLeft: 60,
                      width: "100%",
                      justifyItems: "stretch",
                    }}
                  >
                    {inputField.inputCurrency ? (
                      <>
                        <div className="row">
                          <div className="col-md-6">
                            <ControlLabel> {inputField.label} </ControlLabel>
                          </div>
                          <div className="col-md-6">
                            <div className="d-flex">
                              <select className="from-control ml-3">
                                <option> NGN </option> <option> SFA </option>
                                <option> USD </option>
                              </select>
                              <div style={{ width: 160 }}>
                                <InputNumber
                                  prefix="$"
                                  onChange={inputField.onChange}
                                  value={inputField.value}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="row">
                          <div className="col-md-6">
                            <ControlLabel> {inputField.label} </ControlLabel>
                          </div>
                          <div className="col-md-6">
                            <Input
                              value={inputField.value}
                              name={inputField.controlName}
                              onChange={inputField.onChange}
                              type={inputField.type}
                              componentClass={inputField.componentClass}
                            />
                            <small className="text-danger">
                              {inputField.errorMessage}
                            </small>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </FormGroup>
            </Form>
          </div>
        </div>
        {/*

                            Basic info end
                         
                          */}
        {/* 

                          Product Specification Tab

                          */}
        <Form
          style={{
            marginLeft: 60,
            margin: 20,
            display: this.state.basicSpecificationDisplay,
          }}
        >
          <div className="show-grid mt-4">
            <FlexboxGrid>
              <FlexboxGrid.Item colspan={6}>
                <ControlLabel> Product specification </ControlLabel>
              </FlexboxGrid.Item>
              <FlexboxGrid.Item colspan={14}>
                <RichTextEditor
                  value={this.state.ProductSpecification}
                  editorStyle={{ height: 300 }}
                  onChange={(e) => console.log(e)}
                />
              </FlexboxGrid.Item>
            </FlexboxGrid>
          </div>
          <div className="show-grid mt-4">
            <FlexboxGrid>
              <FlexboxGrid.Item colspan={6} style={{ paddingRight: 20 }}>
                <ControlLabel> Product Manufacturer Information </ControlLabel>
              </FlexboxGrid.Item>
              <FlexboxGrid.Item colspan={14}>
                <RichTextEditor
                  value={this.state.ProductManufacturerInfo}
                  editorStyle={{ height: 300 }}
                  // onChange={this.onChange}
                />
              </FlexboxGrid.Item>
            </FlexboxGrid>
          </div>
          <div className="show-grid mt-4">
            <FlexboxGrid>
              <FlexboxGrid.Item colspan={6} style={{ paddingRight: 20 }}>
                <ControlLabel> Product Warranty Information </ControlLabel>
              </FlexboxGrid.Item>
              <FlexboxGrid.Item colspan={14}>
                <RichTextEditor
                  value={this.state.ProductWarrantyInfo}
                  editorStyle={{ height: 300 }}
                  // onChange={this.onChange}
                />
              </FlexboxGrid.Item>
            </FlexboxGrid>
          </div>
          <div className="show-grid mt-4">
            <FlexboxGrid>
              <FlexboxGrid.Item colspan={6} style={{ paddingRight: 20 }}>
                <ControlLabel> User 's Manual </ControlLabel>
              </FlexboxGrid.Item>
              <FlexboxGrid.Item colspan={14}>
                <RichTextEditor
                  value={this.state.ProductUserManual}
                  editorStyle={{ height: 300 }}
                  // onChange={this.onChange}
                />
              </FlexboxGrid.Item>
            </FlexboxGrid>
          </div>
          <div className="show-grid mt-4">
            <FlexboxGrid>
              <FlexboxGrid.Item colspan={6} style={{ paddingRight: 20 }}>
                <ControlLabel> Product Terms and Condition </ControlLabel>
              </FlexboxGrid.Item>
              <FlexboxGrid.Item colspan={6}>
                <FormControl name="ProductTandC" componentClass="textarea" />
              </FlexboxGrid.Item>
            </FlexboxGrid>
          </div>
        </Form>
        {/* 

                         End Product Specification

                          */}
        {/* 

                         Product Media

                          */}
        <Form
          style={{
            margin: 20,
            marginLeft: 60,
            display: this.state.productMediaDisplay,
            justifyContent: "center",
          }}
        >
          <Message description="Upload product medias, upload maximum of 6 images, and minimum of one. You can upload videos describing your project, maximum file size 15mb" />
          <Uploader
            multiple
            fileList={this.state.fileList}
            onUpload={(files) => console.log(files)}
            listType="picture"
            action=''
          >
            <button>
              <Icon icon="camera-retro" size="lg" />
            </button>
          </Uploader>
        </Form>
        {/* 

                         Services

                          */}
        <div
          style={{
            marginLeft: 60,
            margin: 20,
            display: this.state.productServicesDisplay,
          }}
        >
          <ProductServices />
        </div>
        {/* 

                         buttons

                          */}
        <hr className="my-4" />
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <div className="m-3">
            <Button
              appearance="primary"
              disabled={this.state.disabledPreviousButton}
              onClick={() => this.previous(this.state.stepsCurrent)}
            >
              Previous
            </Button>
          </div>
          <div className="m-3">
            <Button
              appearance="ghost"
              loading={this.state.nextBtnLoading}
              onClick={() => this.next(this.state.stepsCurrent)}
            >
              {this.state.nextBtnText}
            </Button>
          </div>
          <div className="m-3">
            <Button
              loading={this.state.draftBtnLoading}
              appearance="subtle"
              onClick={this.saveDraft}
            >
              Save Draft
            </Button>
          </div>
        </div>
      </Fragment>
    );
  }
}
