import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix Qualifications & Specialties
content = content.replace("Dr. Deepikaa Babu (General Dentist)", "Dr. Deepikaa babu MDS (Orthodontics & Dentofacial Orthopedics)")
content = content.replace("Dr. Deepikaa Babu (General Dentistry)", "Dr. Deepikaa babu MDS (Orthodontics & Dentofacial Orthopedics)")
content = content.replace("(General Dentist,", "(MDS Orthodontics & Dentofacial Orthopedics,")
content = content.replace("General Dentistry", "Orthodontics & Dentofacial Orthopedics")
content = content.replace("General Dentist", "MDS (Orthodontics & Dentofacial Orthopedics)")
content = content.replace("BDS", "MDS")

# Fix Name Case globally
content = content.replace("Dr. Deepikaa Babu", "Dr. Deepikaa babu MDS")

# In some places it might have become "Dr. Deepikaa babu MDS MDS" if it was "Dr. Deepikaa Babu MDS" earlier
content = content.replace("MDS MDS", "MDS")

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated qualifications and owner name successfully.")
