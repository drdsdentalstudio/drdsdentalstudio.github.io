import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace Names
content = content.replace("Lakshmi Dental Care", "Dr. D's Dental Studio")
content = content.replace("LAKSHMI DENTAL CARE", "DR. D'S DENTAL STUDIO")
content = content.replace("Lakshmi", "Dr. D's")

# Replace Contact Details
content = content.replace("lakshmidentalcare5@gmail.com", "drddentalstudiocbe@gmail.com")
content = content.replace("86808 55897", "892-555-6678")
content = content.replace("8680855897", "8925556678")
content = content.replace("+91 892-555-6678/79", "+91 892-555-6678") # Just in case

# Replace Address
content = content.replace("72, Bharathipuram Rd, Govindsalai, Ilango Nagar, Puducherry - 605011", "SIEMA Building, Race course, Coimbatore")
content = content.replace("Puducherry", "Coimbatore")

# Replace Timing
# Let's see if timing is mentioned. If it is, replace it, else we may not need to.
# Let's replace the colors
content = re.sub(r"brand:\s*\{[^\}]+\}", """brand: {
              50: '#FDF8F5',
              100: '#F6ECE5',
              200: '#EBD5C9',
              300: '#DAB8A3',
              400: '#C79A7D',
              500: '#B27C5A',
              600: '#9C623F',
              700: '#7E4C2F',
              800: '#633B25',
              900: '#4A2B1B',
              950: '#27140B',
            }""", content)

content = re.sub(r"beige:\s*\{[^\}]+\}", """beige: {
              50: '#FCFBF9',
              100: '#F4F1EB',
              200: '#E8E1D5',
              300: '#D5CBB8',
              400: '#BDB096',
              500: '#A39476',
              600: '#877A5E',
              700: '#6D614A',
              800: '#574E3C',
              900: '#453E31',
            }""", content)

content = content.replace("'#73308A'", "'#9C623F'")
content = content.replace("'#471A57'", "'#633B25'")
content = content.replace("'#903EB0'", "'#B27C5A'")
content = content.replace("'#DCB6EC'", "'#DAB8A3'")
content = content.replace("bg-[#FAF6FB]", "bg-[#FDF8F5]")
content = content.replace("text-[#73308A]", "text-[#9C623F]")
content = content.replace("border-[#DCB6EC]", "border-[#DAB8A3]")


with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
