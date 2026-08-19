// src/components/relay/ServiceBusinessPreview.tsx
import { MapPin, Wrench } from "lucide-react";
import RelayWidgetEmbed from "./RelayWidgetEmbed";

const ServiceBusinessPreview: React.FC = () => {
  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-slate-300 bg-[#f7f3e9] text-slate-900 shadow-2xl shadow-black/25">
      <div className="flex flex-col gap-2 border-b border-amber-200 bg-amber-50 px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] text-amber-900 sm:flex-row sm:items-center sm:justify-between sm:px-7">
        <span>Demo business · fictional example</span>
        <span>No real service request will be submitted</span>
      </div>

      <div className="flex items-center gap-3 border-b border-slate-200 bg-white px-5 py-5 sm:px-8">
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-teal-700 text-white">
          <Wrench size={20} />
        </span>
        <div>
          <p className="font-black tracking-tight">Mesa Home Comfort</p>
          <p className="text-xs text-slate-500">Interactive service-business demo</p>
        </div>
        <span className="ml-auto hidden items-center gap-1.5 text-xs font-semibold text-teal-800 sm:flex">
          <MapPin size={14} /> Mesa area
        </span>
      </div>

      <div className="grid lg:grid-cols-[0.68fr_1.32fr]">
        <aside className="bg-teal-800 p-7 text-white sm:p-10 lg:p-12">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-200">
            Request service
          </p>
          <h3 className="mt-5 text-3xl font-black leading-tight tracking-[-0.035em]">
            See how one website inquiry can be captured.
          </h3>
          <p className="mt-5 leading-relaxed text-teal-50/80">
            Fill out the example form to experience validation, capture, and
            the immediate acknowledgment a potential customer would see.
          </p>
          <div className="mt-8 border-t border-white/20 pt-6 text-sm text-teal-100/80">
            Use sample information only. Nothing is sent to a real service
            business.
          </div>
        </aside>

        <div className="bg-[#f7f3e9] p-5 sm:p-8 lg:p-10">
          <RelayWidgetEmbed />
        </div>
      </div>
    </div>
  );
};

export default ServiceBusinessPreview;
