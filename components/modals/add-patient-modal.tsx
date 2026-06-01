import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { UserPlus, Heart, Shield, PhoneCall, FileText, User } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createPatient } from "@/actions/patients";

export default function AddPatientModal() {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "male",
    bloodGroup: "",
    insurance: "",
    emergencyName: "",
    emergencyPhone: "",
    allergies: "",
    antecedents: "",
    notes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const result = await createPatient(form);
      if (result.success) {
        toast.success(`Patient added successfully!`, {
          description: `${form.name} has been assigned ID: ${result.id}`,
        });
        setForm({ 
          name: "", email: "", phone: "", dob: "", gender: "male", 
          bloodGroup: "", insurance: "", emergencyName: "", emergencyPhone: "",
          allergies: "", antecedents: "", notes: "" 
        });
        setOpen(false);
      }
    } catch (error) {
      toast.error("Failed to add patient. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white px-5 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 transition-all shadow-sm shadow-teal-500/20">
          <UserPlus className="w-4 h-4" />
          Add Patient
        </button>
      </DialogTrigger>
      <DialogContent className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-slate-900 dark:text-white text-xl flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-teal-600" />
            Create Patient Record
          </DialogTitle>
          <DialogDescription className="text-slate-500 dark:text-slate-400">
            Enter complete details to create a new digital medical record.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4">
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid grid-cols-3 mb-6 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
              <TabsTrigger value="general" className="rounded-lg text-xs font-bold uppercase tracking-wider">
                <User className="w-3.5 h-3.5 mr-2" /> General
              </TabsTrigger>
              <TabsTrigger value="medical" className="rounded-lg text-xs font-bold uppercase tracking-wider">
                <Heart className="w-3.5 h-3.5 mr-2" /> Medical
              </TabsTrigger>
              <TabsTrigger value="emergency" className="rounded-lg text-xs font-bold uppercase tracking-wider">
                <Shield className="w-3.5 h-3.5 mr-2" /> Emergency
              </TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-black uppercase text-slate-500 mb-1.5 ml-1">Full Name *</label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-200 dark:focus:ring-teal-900 outline-none transition-all dark:text-slate-200"
                    placeholder="e.g. Jean Dupont"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase text-slate-500 mb-1.5 ml-1">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-200 dark:focus:ring-teal-900 outline-none transition-all dark:text-slate-200"
                    placeholder="jean@example.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase text-slate-500 mb-1.5 ml-1">Phone *</label>
                  <input
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-200 dark:focus:ring-teal-900 outline-none transition-all dark:text-slate-200"
                    placeholder="+33 6 12 34 56 78"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase text-slate-500 mb-1.5 ml-1">Date of Birth</label>
                  <input
                    type="date"
                    value={form.dob}
                    onChange={(e) => setForm({ ...form, dob: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-200 dark:focus:ring-teal-900 outline-none transition-all dark:text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase text-slate-500 mb-1.5 ml-1">Gender</label>
                  <select
                    value={form.gender}
                    onChange={(e) => setForm({ ...form, gender: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-200 dark:focus:ring-teal-900 outline-none transition-all dark:text-slate-200"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="medical" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase text-slate-500 mb-1.5 ml-1">Blood Group</label>
                  <select
                    value={form.bloodGroup}
                    onChange={(e) => setForm({ ...form, bloodGroup: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-200 dark:focus:ring-teal-900 outline-none transition-all dark:text-slate-200"
                  >
                    <option value="">Select Group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-black uppercase text-slate-500 mb-1.5 ml-1">Health Insurance</label>
                  <input
                    value={form.insurance}
                    onChange={(e) => setForm({ ...form, insurance: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-200 dark:focus:ring-teal-900 outline-none transition-all dark:text-slate-200"
                    placeholder="Policy Number"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-black uppercase text-slate-500 mb-1.5 ml-1">Allergies</label>
                  <input
                    value={form.allergies}
                    onChange={(e) => setForm({ ...form, allergies: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-200 dark:focus:ring-teal-900 outline-none transition-all dark:text-slate-200"
                    placeholder="e.g. Penicillin, Peanuts"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-black uppercase text-slate-500 mb-1.5 ml-1">Medical Antecedents</label>
                  <textarea
                    rows={2}
                    value={form.antecedents}
                    onChange={(e) => setForm({ ...form, antecedents: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-200 dark:focus:ring-teal-900 outline-none transition-all resize-none dark:text-slate-200"
                    placeholder="Chronic conditions, past surgeries..."
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="emergency" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-black uppercase text-slate-500 mb-1.5 ml-1">Emergency Contact Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      value={form.emergencyName}
                      onChange={(e) => setForm({ ...form, emergencyName: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-200 dark:focus:ring-teal-900 outline-none transition-all dark:text-slate-200"
                      placeholder="Contact person name"
                    />
                  </div>
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-black uppercase text-slate-500 mb-1.5 ml-1">Emergency Contact Phone</label>
                  <div className="relative">
                    <PhoneCall className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      value={form.emergencyPhone}
                      onChange={(e) => setForm({ ...form, emergencyPhone: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-200 dark:focus:ring-teal-900 outline-none transition-all dark:text-slate-200"
                      placeholder="Contact person phone"
                    />
                  </div>
                </div>
                <div className="col-span-2 pt-2">
                   <div className="p-4 bg-teal-50 dark:bg-teal-500/5 rounded-2xl border border-teal-500/10 flex gap-4 items-center">
                      <div className="w-10 h-10 rounded-full bg-teal-500/10 flex items-center justify-center text-teal-600">
                         <FileText className="w-5 h-5" />
                      </div>
                      <div>
                         <h4 className="text-sm font-bold text-slate-900 dark:text-white">Digital Record Consent</h4>
                         <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">By adding this patient, you confirm having their consent for data processing.</p>
                      </div>
                   </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter className="gap-2 mt-8 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button 
              type="button" 
              onClick={() => setOpen(false)} 
              className="px-6 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors uppercase tracking-widest"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="px-8 py-2.5 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-teal-500/20 uppercase tracking-widest disabled:opacity-50"
            >
              {isSubmitting ? "Creating..." : "Create Record"}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
