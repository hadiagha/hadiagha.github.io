---
layout: page
title: Curriculum Vitae
description: Senior Data Scientist · Applied Scientist · Machine Learning Engineer
permalink: /cv/
updated: 2026-08-24
---

<div class="cv-download">
  <a href="{{ '/assets/hadi_cv.pdf' | relative_url }}" class="btn btn-primary" download>
    {% include icon.html name="download" %} Download PDF
  </a>
  <p class="cv-contact">
    <a href="mailto:hadi@hadiaghazadeh.com">hadi@hadiaghazadeh.com</a> ·
    Calgary, Alberta, Canada
  </p>
</div>

## Profile

Senior Data Scientist and applied machine learning researcher with **8+ years**
building production forecasting, optimization and decision-intelligence systems.
I own the end-to-end development and operation of **locational marginal price
forecasting across thousands of pricing nodes** in US and Canadian electricity
markets, covering feature engineering, applied research, model development,
distributed training, deployment, APIs, monitoring and production maintenance.

Specialized in time-series forecasting, operations research, mixed-integer
optimization and reinforcement learning, with hands-on experience building
cloud-native ML systems. PhD, published researcher, and author of a
practical book on applied reinforcement learning.

## Experience

### Senior Data Scientist — Enverus
*March 2026 – Present · Calgary, Canada*

- Own end-to-end development and production operation of **locational marginal
  price forecasting** across U.S. and Canadian electricity markets.
- Lead the full ML lifecycle: data analysis, feature engineering, applied
  research, model development, backtesting, distributed training, deployment,
  API development, monitoring, incident resolution and ongoing maintenance.
- Build and operate large-scale training and inference pipelines on
  **Kubernetes**, with **Google Cloud** for model serving and storage,
  **Snowflake** for analytical workloads and **Kafka** for streaming data.
- Develop reproducible deployment and model-management workflows with **Pulumi
  and Terraform**; production observability with **Grafana and Sentry**.
- Research and prototype **Graph Neural Nets** and large-scale **mixed-integer linear programming** for
  power-flow and **security-constrained unit commitment**, emphasising fast,
  computationally efficient electricity-price optimization.
- Investigate **reinforcement-learning-guided cutting-plane selection** to
  improve branch-and-bound search and accelerate large-scale power-system
  optimization models.

### Machine Learning Engineer — Bits in Glass
*April 2024 – February 2026 · Calgary, Canada (Remote)*

- Led technical development of a production **hierarchical RAG platform
  processing more than 20 million oil-and-gas documents**, combining structured
  and unstructured data, hybrid retrieval, embedding-model evaluation,
  Databricks, LangChain and Model Context Protocol.
- Contributed in a production **dynamic fuel-pricing optimization system** using
  integer linear programming and contextual bandits, supporting adaptive margin-
  and volume-based strategies and cutting pricing decision time from several
  hours to **under 30 minutes**.
- Directed implementation of an **agentic AI framework for railway legacy-system
  modernization**, automating extraction of business rules and user stories from
  COBOL applications.
- Built an AI-enabled **energy-sector digital twin** integrating AWS TwinMaker,
  IoT sensor data, 3D asset models and natural-language scenario exploration.
- Developed an end-to-end LLM document-processing pipeline with LangGraph and
  Databricks Mosaic AI, achieving **95%+ structured extraction accuracy** on
  batch invoice data.
- Designed a repeatable evaluation framework for enterprise RAG systems with
  limited ground-truth data.

### Associate Machine Learning Developer — AltaML
*May 2023 – September 2023 · Calgary, Canada (Hybrid)*

- Contribute in developing a scalable hybrid demand-forecasting system for **100+ fuel-retail
  locations**, improving inventory planning and generating more than **$1 million
  in projected annual savings**.

### Senior Data Scientist — Snapp
*May 2021 – June 2022 · Tehran, Iran (Hybrid)*
*Largest ride-hailing platform in the Middle East*

- Led development of a learning-based **dynamic surge-pricing
  system** that improved order-fulfilment rate by **5%** across more than
  **200,000 daily orders**, improving marketplace balance, revenue performance
  and driver utilization.
- Directed development of an unsupervised **fraud-detection system** achieving
  **90%+ recall** and eliminating more than **300 hours of manual review per
  month**.

### Data Scientist — Fanap (PARSA)
*January 2018 – April 2021 · Tehran, Iran*

- Led development of an end-to-end **ATM cash-demand forecasting and
  replenishment optimization system**, achieving **17% MAPE** and reducing
  operational costs by **10%**.

## Education

### PhD, Geomatics Engineering — University of Calgary
*July 2022 – October 2026 · GPA 4.0/4.0*

Research: reinforcement learning, real-time policy optimization, vehicle
routing, disaster-response logistics and transportation optimization.

### MSc, Industrial Engineering — Amirkabir University of Technology
*2015 – 2018 · Tehran Polytechnic*

### BSc, Industrial Engineering — Iran University of Science and Technology
*2011 – 2015*

## Book and selected publications

**Aghazadeh, H.** (2026). *Applied Reinforcement Learning: Business optimization
and LLM fine-tuning.* Manning Publications.
[Publisher]({{ site.book.manning }})

The [research page]({{ '/research/' | relative_url }}) lists all publications
with venues and links.

## Technical expertise

**Forecasting and machine learning** — time-series forecasting, demand
forecasting, LMP forecasting, feature engineering, backtesting, model
evaluation, deep learning, transformer architectures, large language models,
RAG, agentic AI, foundation-model fine-tuning

**Optimization and decision science** — operations research, mixed-integer
linear programming, security-constrained unit commitment, power-flow
optimization, branch-and-bound, cutting planes, reinforcement learning, deep RL,
contextual bandits, dynamic pricing, vehicle routing, supply-chain optimization

**Production ML and infrastructure** — Kubernetes, Google Cloud Platform,
Snowflake, Kafka, Terraform, Pulumi, Grafana, Sentry, Databricks, MLflow,
Docker, AWS, SageMaker, Bedrock, Microsoft Azure, CI/CD for ML, model serving,
API development, production monitoring

**Frameworks and tools** — Python, PyTorch, TensorFlow, LangChain, LangGraph,
Hugging Face, Model Context Protocol, OpenAI API, Claude API, Apache Spark

## Certifications

- **Databricks Certified Machine Learning Associate** (2024)
- **Reinforcement Learning Specialization**, University of Alberta / Coursera (2022)

## Selected honors and awards

- **Alberta Innovates Graduate Student Scholarship** (2024) — $31,000 per year for two years
- **First Place, Amii Reinforcement Learning Competition**, Upper Bound Conference (2024)
- **Open Doctoral Scholarship**, University of Calgary (2024) — $15,000
- **First Place, AI Demand Forecasting Competition**, Amirkabir University of
  Technology (2018) — first among more than 150 teams

## Leadership and teaching

- **Vice President and Student Representative**, Graduate Geomatics Group,
  University of Calgary (2023–2024) — led a graduate engineering community of
  more than 50 members
- **Teaching Assistant**, University of Calgary — Engineering Design,
  Programming with Data, Spatial Data Mining
- **Course instructor and creator** — *Contextual Multi-Armed Bandits in Python*
  and *Reinforcement Learning for Operations Research*
- **Peer reviewer** for machine learning, transportation, optimization and
  spatial-computing journals

## Languages

English (advanced) · Persian (native) · Azeri (mother tongue)

<style>
.cv-download {
  text-align: center;
  margin-bottom: var(--space-2xl);
  padding: var(--space-xl);
  background-color: var(--color-bg-secondary);
  border-radius: 0.5rem;
}

.cv-download .cv-contact {
  margin: var(--space-md) 0 0;
  font-size: 0.95rem;
  color: var(--color-text-light);
}

.page-content h2 {
  color: var(--color-primary);
  border-bottom: 2px solid var(--color-border);
  padding-bottom: 0.5rem;
  margin-top: var(--space-2xl);
}

.page-content h3 {
  color: var(--color-text);
  margin-top: var(--space-xl);
  margin-bottom: 0.25rem;
}

.page-content h3 + p em {
  color: var(--color-text-light);
}

.page-content ul {
  list-style-type: disc;
  margin-left: var(--space-xl);
}

.page-content ol {
  margin-left: var(--space-xl);
}
</style>
