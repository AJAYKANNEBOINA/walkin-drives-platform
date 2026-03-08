import { latestDrives } from "@/data/mockData";
import DriveCard from "./DriveCard";
import { motion } from "framer-motion";

const LatestDrives = () => (
  <section className="py-20">
    <div className="container">
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-foreground">Latest Walk-in Opportunities</h2>
        <p className="mt-1 text-muted-foreground">Newly posted drives across top cities</p>
      </div>
      <div className="space-y-3">
        {latestDrives.map((d, i) => (
          <motion.div
            key={d.id}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
          >
            <DriveCard drive={d} variant="list" />
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default LatestDrives;
