// src/dhx-gantt.d.ts
declare module "dhtmlx-gantt" {
  const gantt: {
    templates: any;
    getLink(id: any): unknown;
    plugins(arg0: { undo: boolean; critical_path: boolean; fullscreen: boolean; }): unknown;
    render(): any;
    config: any;
    init: (container: HTMLElement | null) => void;
    parse: (data: { data: any[]; links: any[] }) => void;
    clearAll: () => void;
  };
  export default gantt;
}
// src/types/dhx-gantt.d.ts
declare module '@dhx/react-gantt' {
  export const Gantt: any;
  export type Task = any;
  export type Link = any;
  export type GanttConfig = any;
}
