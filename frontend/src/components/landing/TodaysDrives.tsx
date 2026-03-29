import { featuredDrives } from "@/data/mockData";
import DriveCard from "./DriveCard";
import { motion } from "framer-motion";

const TodaysDrives = () => (
  <section className="bg-secondary/30 py-20">
    <div className="container">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Today's Walk-in Drives</h2>
          <p className="mt-1 text-muted-foreground">Featured drives happening now and upcoming today</p>
        </div>
        <a href="/drives" className="hidden text-sm font-medium text-primary hover:underline md:block">
          View all drives →
        </a>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {featuredDrives.map((d, i) => (
          <motion.div
            key={d.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          >
            <DriveCard drive={d} />
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TodaysDrives;
