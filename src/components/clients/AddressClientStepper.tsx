import Button from "../Button";
import NavClientsStepper from "./NavClientsStepper";
import { useFormik } from "formik"
import * as Yup from 'yup';
import { useRegFormContext } from "./StepperClientProvider";
import Label from "../Label";
import Input from "../Input";
import SaveClient, {SaveClientLogo} from "@/app/functions/SaveClient";
import { showToastMessage, showToastMessageError } from "../Alert";
import { useRef } from "react";
//import { clientValidation } from "@/schemas/client.schema";
import { useClientStore } from "@/app/store/clientStore";

export default function AddressClientStepper({token}:{token:string}){
  
  const [state, dispatch] = useRegFormContext();
  const refRequest = useRef(true);
  const {pushClient} = useClientStore();

  let stretI = '';
  let cpI = '';
  let municipyI = '';
  let countryI= '';
  let communityI = '';
  let stateSI = '';

  if(state.address){
    stretI = state.address.stret;
    cpI = state.address.cp;
    municipyI = state.address.municipy;
    countryI = state.address.country? state.address.country : '';
    communityI = state.address.community;
    stateSI = state.address.stateS? state.address.stateS: '';
  }
  
  const formik = useFormik({
    initialValues: {
      stret:stretI,
      cp:cpI,
      municipy: municipyI,
      country: countryI,
      community: communityI,
      stateS: stateSI,
    }, 
    validationSchema: Yup.object({
      stret: Yup.string()
                  .required('La calle no puede ir vacia'),
      cp: Yup.string()
                  .required('El codigo postal es obligatorio'),
      municipy: Yup.string()
                  .required('El municipio no puede ir vacio'),
      country: Yup.string()
                  .required('El pais no puede ir vacio'),
      community: Yup.string()
                    .required('La colonia no puede ir vacia'),
      stateS: Yup.string()
                  .required('El estado no puede ir vacio'),
    }),
    onSubmit: async (valores) => {            
      const {country, cp, municipy, stret, community, stateS} = valores;
      
      const data = {
        country,
        municipy,
        stret,
        cp: parseInt(cp),
        community, 
        stateS
      }

      //dispatch({ type: 'SET_ADDRESS_DATA', data: valores });
      dispatch({ type: 'SET_ADDRESS_DATA', data: data });
      dispatch({type: 'INDEX_STEPPER', data: 3})
    },       
  });

  const onClickSave = async() => {
    refRequest.current = false;
    if(state.extradata.photo){
      const data = new FormData();
      if(state.databasic){
        data.append('name', state.databasic.name);
        data.append('tradename', state.databasic.tradename);
        if(state.databasic.email){
          data.append('email', state.databasic.email);
        }
        data.append('rfc', state.databasic.rfc);
        data.append('source', state.databasic.source);
        //data.append('tags', state.databasic.tags);
        // if(state.databasic.tags){
        //   state.databasic.tags.map((tag: string) => {
        //     data.append('tags', tag);
        //   })
        // }
        data.append('regime', state.databasic.regime);
        if(state.databasic.user){
          data.append('user', state.databasic.user);
        }
        // if(state.databasic.phone){
        //   data.append('phone', state.databasic.phone);
        // }
      }
      if(state.extradata){
        data.append('logo', state.extradata.photo);
        if(state.extradata.link){
          data.append('link', state.extradata.link);
        }
      }
      
      const {community, country, cp, municipy, stateS, stret} = formik.values;
      
      const location = {
        community,
        country,
        cp: parseInt(cp),
        municipy,
        state: stateS,
        stret
      }

      // if(state.contacts){
      //   state.contacts.map((contact: string) => {
      //     data.append('contact', contact);
      //   })
      // }

      try {
        const res = await SaveClientLogo(data, token, location, 
                      state.databasic.tags? state.databasic.tags: [], 
                      state.contacts? state.contacts: [],
                      state.databasic.phone? state.databasic.phone: '');
        if(res.status){
          refRequest.current = true;
          showToastMessage(res.message);
          if(res.client) pushClient(res.client);
          // setTimeout(() => {
          //   window.location.reload();
          // }, 500);
        }else{
          refRequest.current = true;
          showToastMessageError(res.message);
        }
      } catch (error) {
        refRequest.current = true;
        showToastMessageError('Error al crear cliente!!');
      }
      // const newdata = Object.fromEntries(data);
      // try {
      //   const res = clientValidation.safeParse(newdata);
      //   console.log(res);
      //  } catch (error) {
      //   console.log(error);
      //  }
    }else{
      let name='', tradename='', email='', rfc='', source='', phone='',tags=[], user='', regime='';
      if(state.databasic){
        name=state.databasic.name? state.databasic.name : '';
        tradename=state.databasic.tradename? state.databasic.tradename : '';
        email=state.databasic.email? state.databasic.email : '';
        rfc=state.databasic.rfc? state.databasic.rfc : '';
        phone=state.databasic.phone? state.databasic.phone : '';
        source=state.databasic.source? state.databasic.source : '';
        tags=state.databasic.tags? state.databasic.tags : '';
        user=state.databasic.user? state.databasic.user : '';
        regime=state.databasic.regime? state.databasic.regime : '';
      }

      let link='';
      if(state.extradata){
        link = state.extradata.link? state.extradata.link: '';
      }

      let contact = [];
      if(state.contacts){
        contact = state.contacts;
      }

      const {community, country, cp, municipy, stateS, stret} = formik.values;

      const data = {
        name, 
        tradename, 
        email, 
        rfc, 
        phone, 
        source,
        tags, 
        user,
        link,
        //photo,
        regime,
        location: {
          stret,
          cp: parseInt(cp),
          municipy, 
          country,
          community,
          state:stateS,
        },
        contact
      }

      try {
        const res = await SaveClient(data, token);
        if(res.status){
          refRequest.current = true;
          showToastMessage(res.message);
          if(res.client) pushClient(res.client);
          // setTimeout(() => {
          //   window.location.reload();
          // }, 500);
        }else{
          refRequest.current = true;
          showToastMessageError(res.message);
        }
      } catch (error) {
        refRequest.current = true;
        showToastMessageError('Error al crear cliente!!');
      }
    }
  }

  return(
    <div className="w-full">
      <div className="my-5">
        <NavClientsStepper index={2} />
      </div>
      <form onSubmit={formik.handleSubmit} className="mt-4 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="">
            <Label htmlFor="stret"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Calle y numero</p></Label>
            <Input type="text" name="stret" autoFocus 
              value={formik.values.stret}
              onChange={formik.handleChange}
              onBlur={formik.handleChange}
            />
            {formik.touched.stret && formik.errors.stret ? (
              <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
                <p>{formik.errors.stret}</p>
              </div>
            ) : null}
          </div>
          <div className="">
            <Label htmlFor="community"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Colonia / Localidad</p></Label>
            <Input type="text" name="community" 
              value={formik.values.community}
              onChange={formik.handleChange}
              onBlur={formik.handleChange}
            />
            {formik.touched.community && formik.errors.community ? (
              <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
                <p>{formik.errors.community}</p>
              </div>
            ) : null}
          </div>
          <div className="">
            <Label htmlFor="cp"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Codigo postal</p></Label>
            <Input type="text" name="cp"
              value={formik.values.cp}
              onChange={formik.handleChange}
              onBlur={formik.handleChange}
            />
            {formik.touched.cp && formik.errors.cp ? (
              <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
                <p>{formik.errors.cp}</p>
              </div>
            ) : null}
          </div>
          <div className="">
            <Label htmlFor="municipy"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Municipio / Delegacion</p></Label>
            <Input type="text" name="municipy"
              value={formik.values.municipy}
              onChange={formik.handleChange}
              onBlur={formik.handleChange}
            />
            {formik.touched.municipy && formik.errors.municipy ? (
              <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
                <p>{formik.errors.municipy}</p>
              </div>
            ) : null}
          </div>
          <div className="">
            <Label htmlFor="stateS"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Estado</p></Label>
            <Input type="text" name="stateS"
              value={formik.values.stateS}
              onChange={formik.handleChange}
              onBlur={formik.handleChange}
            />
            {formik.touched.stateS && formik.errors.stateS ? (
              <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
                <p>{formik.errors.stateS}</p>
              </div>
            ) : null}
          </div>
          <div className="">
            <Label htmlFor="country"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Pais</p></Label>
            <Input type="text" name="country"
              value={formik.values.country}
              onChange={formik.handleChange}
              onBlur={formik.handleChange}
            />
            {formik.touched.country && formik.errors.country ? (
              <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
                <p>{formik.errors.country}</p>
              </div>
            ) : null}
          </div>
        </div>
        
        <div className="flex justify-center mt-8 space-x-5">
          <Button 
            onClick={() => {
              if(refRequest.current){
                onClickSave();
              }
              else{
                showToastMessageError('Ya hay una peticion en proceso..!');
              }
            }} type="button">Guardar</Button>
          <button type="submit"
            className="border w-36 h-9 bg-white font-normal text-sm text-slate-900 border-slate-900 rounded-xl
            hover:bg-slate-200"
          >
            Siguiente
          </button>
        </div>
      </form>  
    </div>
  )
}