"use client";

import { useState } from "react";
import { StepEventInfo } from "./step-event-info";
import { StepMenu } from "./step-menu";
import { StepSummary } from "./step-summary";
import { ChevronRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
    { id: 1, name: "Detalles del Evento" },
    { id: 2, name: "Selección de Menú" },
    { id: 3, name: "Resumen & Cotización" },
];

export function QuoteWizard() {
    const [currentStep, setCurrentStep] = useState(1);

    const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length));
    const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

    return (
        <div className="max-w-5xl mx-auto px-4 py-12">
            {/* Progress Bar */}
            <div className="mb-12">
                <div className="flex justify-between items-center relative">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-stone-200 -z-10" />

                    {steps.map((step) => (
                        <div key={step.id} className="flex flex-col items-center gap-2 bg-stone-50 px-4">
                            <div
                                className={cn(
                                    "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors",
                                    currentStep >= step.id ? "bg-amber-600 text-white" : "bg-stone-300 text-stone-500"
                                )}
                            >
                                {currentStep > step.id ? <Check className="w-5 h-5" /> : step.id}
                            </div>
                            <span className={cn(
                                "text-sm font-medium",
                                currentStep >= step.id ? "text-stone-800" : "text-stone-400"
                            )}>
                                {step.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Step Content */}
            <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-8 min-h-[400px]">
                {currentStep === 1 && <StepEventInfo onNext={nextStep} />}
                {currentStep === 2 && <StepMenu onNext={nextStep} onPrev={prevStep} />}
                {currentStep === 3 && <StepSummary onPrev={prevStep} />}
            </div>
        </div>
    );
}
