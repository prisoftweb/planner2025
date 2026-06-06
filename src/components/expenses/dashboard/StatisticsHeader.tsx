'use client'

import { GiShoppingBag } from 'react-icons/gi';
import { BsBarChartFill } from 'react-icons/bs';
import { DateRangePicker } from '@tremor/react';
import { es } from "date-fns/locale"
import SelectReact from '@/components/SelectReact';
import { Options } from '@/interfaces/Common';
import { useState, useEffect } from 'react';
import { DateRangePickerValue, ProgressCircle } from '@tremor/react';
import Label from '@/components/Label';
import { CostsGroupByResumen, CostsGroupResumenByType } from '@/interfaces/DashboardsCosts';
import { CurrencyFormatter, MoneyFormatter } from '@/app/functions/Globals';
import {Tooltip} from "@nextui-org/react";
import { CostsByConceptAndCategory } from '@/interfaces/DashboardsCosts';
import { PDFDownloadLink } from "@react-pdf/renderer";
import { BsFileEarmarkPdf } from "react-icons/bs"; //Archivo PDF
import ReportCostsCategoryAndConceptPDF from './ReportCostsCategoryAndConcept';
import { propsTooltip } from '@/libs/animations';
import { Company } from "@/interfaces/Companies";
import { getCompany } from "@/app/api/routeCompany";
import { showToastMessageError } from '@/components/Alert';
import { getDate } from '@/libs/dates';
import SelectMultipleReact from '@/components/SelectMultipleReact';

type StatisticsHeaderProps = {
  handleDate: Function, 
  projects:Options[],
  categories:Options[], 
  costsResumen:CostsGroupByResumen[], 
  costsResumenType:CostsGroupResumenByType[], 
  dataCostsCatagory: CostsByConceptAndCategory[], 
  dataCostsConcept: CostsByConceptAndCategory[],
  company:string,
  token:string
}

export default function StatisticsHeader({handleDate, projects, costsResumen, costsResumenType, 
      dataCostsCatagory, dataCostsConcept, company, token, categories }: StatisticsHeaderProps) {

  const [project, setProject] = useState<string>(projects[0].value);
  const [arrCategories, setArrCategories] = useState<string[]>([]);
  const [titleProject, setTitleProject] = useState<string>(projects[0].label);
  const [satCompany, setSatCompany]=useState<Company>();
  const [rangeDate, setRangeDate] = useState<DateRangePickerValue>({
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    to: new Date(),
  });

  useEffect(() => {
    const fetch = async () => {
      const [rescomp] = await Promise.all([
        // getCompanyTAXDATAFULL(res.company, token),
        getCompany(token, company),
      ]);
      
      if(typeof(rescomp)==='string'){
        showToastMessageError(rescomp);
      }else{
        // console.log('res comp => ', rescomp);
        setSatCompany(rescomp);
      }
    }

    fetch();
  }, []);

  const handleProjects = (value: string) => {
    setProject(value);
    const selectedProject = projects.find(proj => proj.value === value);
    if (selectedProject) {
      setTitleProject(selectedProject.label);
    }
    if(rangeDate?.from && rangeDate.to){
      // handleDate(rangeDate.from, rangeDate.to, value);
      handleDate(getDate(rangeDate.from), getDate(rangeDate.to), value, arrCategories);
    }
  };

  const handleCategories = (value: string[]) => {
    setArrCategories(value);
    
    if(rangeDate?.from && rangeDate.to){
      // handleDate(rangeDate.from, rangeDate.to, value);
      handleDate(getDate(rangeDate.from), getDate(rangeDate.to), project, value);
    }
  };

  return (
    <div>
      <div>
        <div className='flex flex-wrap justify-end items-center p-3 gap-x-5 gap-y-3 mt-2'>
          <div>
            <Label htmlFor='date'>Fecha</Label>
            <DateRangePicker 
              className='mt-2'
              placeholder='Seleccione un rango de fechas'
              onValueChange={(e) => {
                setRangeDate(e);
                if(e.from && e.to){
                  // handleDate(e.from.toDateString(), e.to.toDateString(), project);
                  handleDate(getDate(e.from), getDate(e.to), project, arrCategories);
                }
              }}
              value={rangeDate}
              locale={es}
            />
          </div>
          <div className='flex items-center gap-x-1'>
            <div className='w-80 sm:w-56'>
              <Label htmlFor='project'>Proyecto</Label>
              <SelectReact index={0} opts={projects} setValue={handleProjects} />
            </div>
            <div className='w-80 sm:w-56'>
              <Label htmlFor='category'>Categoria</Label>
              {/* <SelectReact index={0} opts={categories} setValue={handleProjects} /> */}
              <SelectMultipleReact opts={categories} setValue={handleCategories} index={-1} />
            </div>
            <div className='w-5'>
              <Label></Label>
              {dataCostsCatagory && dataCostsCatagory.length >= 0 && satCompany && (
                <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} 
                  content='categoria'
                  className="text-slate-900 bg-white rounded-md border border-slate-400" placement="top">
                  <PDFDownloadLink document={<ReportCostsCategoryAndConceptPDF data={dataCostsCatagory} satCompany={satCompany}
                                                type={true} rangeDate={rangeDate} projectTitle={titleProject} />} 
                      fileName={`InformeCostosAgrupadosPorCategoria`} >
                    {({loading, url, error, blob}) => 
                      loading? (
                        <BsFileEarmarkPdf className="w-6 h-6 text-slate-500" />
                      ) : (
                        <BsFileEarmarkPdf className="w-6 h-6 text-blue-500" />
                      ) }
                  </PDFDownloadLink>
                </Tooltip>
              )}
            </div>
            <div className='w-5'>
              <Label></Label>
              {dataCostsConcept && dataCostsConcept.length >= 0 && satCompany && (
                <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} 
                    content='concepto' 
                    className="text-slate-900 bg-white rounded-md border border-slate-400" placement="top">
                    <PDFDownloadLink document={<ReportCostsCategoryAndConceptPDF data={dataCostsConcept} satCompany={satCompany} 
                                                  type={false} rangeDate={rangeDate} projectTitle={titleProject} />} 
                      fileName={`InformeCostosAgrupadosPorConcepto`} >
                    {({loading, url, error, blob}) => 
                      loading? (
                        <BsFileEarmarkPdf className="w-6 h-6 text-slate-500" />
                      ) : (
                        <BsFileEarmarkPdf className="w-6 h-6 text-blue-500" />
                      ) }
                  </PDFDownloadLink>
                </Tooltip>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3'>
        <div className='grid grid-cols-3 gap-x-1 bg-white border 
            border-slate-300 p-1'>
          <div className='w-full h-full flex flex-col justify-center items-center'>
            <GiShoppingBag className='w-12 h-auto' />
            {costsResumenType.length > 0 && (
              <>
                <p className='text-xs'>{costsResumenType[0].tipo}</p>
                <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} 
                    content={CurrencyFormatter({
                      currency: 'USD',
                      value: costsResumenType[0].subtotalCost
                    })} 
                    className="text-slate-900 bg-white rounded-md border border-slate-400" placement="top">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-50">
                    {MoneyFormatter(costsResumenType[0].subtotalCost)}
                  </p>
                </Tooltip>
              </>
            )}
          </div>
          <div className='w-full h-full flex flex-col justify-center'>
            {costsResumenType.length > 1 && (
              <>
                <p className='text-xs'>{costsResumenType[1].tipo}</p>
                <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} 
                    content={CurrencyFormatter({
                      currency: 'USD',
                      value: costsResumenType[1].subtotalCost
                    })} 
                    className="text-slate-900 bg-white rounded-md border border-slate-400" placement="top">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-50">
                    {MoneyFormatter(costsResumenType[1].subtotalCost)}
                  </p>
                </Tooltip>
              </>
            )}
          </div>
          <div>
            {costsResumenType.length > 2 && (
              <>
                <p className='text-xs'>{costsResumenType[2].tipo}</p>
                <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} 
                    content={CurrencyFormatter({
                      currency: 'USD',
                      value: costsResumenType[2].subtotalCost
                    })} 
                    className="text-slate-900 bg-white rounded-md border border-slate-400" placement="top">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-50">
                    {MoneyFormatter(costsResumenType[2].subtotalCost)}
                  </p>
                </Tooltip>
              </>
            )}
          </div>
        </div>

        <div className='flex items-center gap-x-4 bg-white border border-slate-300 
            p-5'>
          <div>
            <ProgressCircle value={75} size="md">
              <span className="text-xs font-medium text-slate-700">75%</span>
            </ProgressCircle>
          </div>
          <div>
            <div>
              <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} 
                  content={CurrencyFormatter({
                    currency: 'USD',
                    value: costsResumen.length > 0? costsResumen[0].subtotalCost : 0
                  })} 
                  className="text-slate-900 bg-white rounded-md border border-slate-400" placement="top">
                <p className="text-2xl">
                  {MoneyFormatter(costsResumen.length > 0? costsResumen[0].subtotalCost : 0)}
                </p>
              </Tooltip>
              <p className='text-xs'>Costo</p>
            </div>
            <div className='mt-3'>
              <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} 
                  content={CurrencyFormatter({
                    currency: 'USD',
                    value: costsResumen.length > 0? costsResumen[0].totalIVA : 0
                  })} 
                  className="text-slate-900 bg-white rounded-md border border-slate-400" placement="top">
                <p className="text-2xl">
                  {MoneyFormatter(costsResumen.length > 0? costsResumen[0].totalIVA : 0)}
                </p>
              </Tooltip>
              <p className='text-xs'>Iva</p>
            </div>
          </div>
        </div>

        <div className='flex items-center justify-around gap-x-4 bg-white border border-slate-300 
           p-5'>
          <div>
            <p className='text-2xl'>{costsResumen.length > 0? costsResumen[0].quantity: 0}</p>
            <p className='text-xs'>GRANTOTAL</p>
            <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} 
                  content={CurrencyFormatter({
                    currency: 'USD',
                    value: costsResumen.length > 0? costsResumen[0].totalCost : 0
                  })} 
                  className="text-slate-900 bg-white rounded-md border border-slate-400" placement="top">
                <p className="text-2xl">
                  {MoneyFormatter(costsResumen.length > 0? costsResumen[0].totalCost : 0)}
                </p>
              </Tooltip>
          </div>
          <div>
            <BsBarChartFill className='w-12 h-auto' />
          </div>
        </div>

      </div>
    </div>
  )
}
