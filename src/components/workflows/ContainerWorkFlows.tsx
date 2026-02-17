'use client'
import Header from "@/components/Header";
import TableWorkflows from "@/components/workflows/TableWorkflows";
import ButtonNew from "@/components/workflows/ButtonNew";
import { UsrBack } from "@/interfaces/User";
import { WorkflowTable } from "@/interfaces/Workflows";
import { useState, useEffect, useRef } from "react";

export default function ContainerWorkFlows({token, user, data}: {token:string, user:UsrBack, data:WorkflowTable[]}) {

  const [newWorkFlow, setNewWorkFlow] = useState<boolean>(false);

  // const [searchValue, setSearchValue] = useState("");

  const searchRef = useRef<HTMLInputElement | null>(null);
  const sidenavFirstItemRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (newWorkFlow) {
      requestAnimationFrame(() => {
        sidenavFirstItemRef.current?.focus();
      });
    } else {
      searchRef.current?.focus();
    }
  }, [newWorkFlow]);
  
  const handleClick = (value:boolean) => {
    setNewWorkFlow(value);
  }

  return (
    <>
      <div className="p-2 sm:p-3 md-p-5 lg:p-10">
        <Header title="Workflows" placeHolder="Buscar workflow.." ref={searchRef} >
          <ButtonNew token={token} handleClick={handleClick} newWorkFlow={newWorkFlow} ref={sidenavFirstItemRef} />
        </Header>
        <div className="mt-5">
          <TableWorkflows data={data} token={token} />
        </div>
      </div>
    </>
  )
}

export function ContainerButtonWorkFlow({token}: {token:string}) {

  const [newWorkFlow, setNewWorkFlow] = useState<boolean>(false);

  const searchRef = useRef<HTMLInputElement | null>(null);
  const sidenavFirstItemRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (newWorkFlow) {
      requestAnimationFrame(() => {
        sidenavFirstItemRef.current?.focus();
      });
    } else {
      searchRef.current?.focus();
    }
  }, [newWorkFlow]);
  
  const handleClick = (value:boolean) => {
    setNewWorkFlow(value);
  }

  return (
    <>
      <ButtonNew token={token} handleClick={handleClick} newWorkFlow={newWorkFlow} ref={sidenavFirstItemRef} />
    </>
  )
}